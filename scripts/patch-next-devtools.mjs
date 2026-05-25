#!/usr/bin/env node
/**
 * Disables the Next.js Segment Explorer dev-overlay by neutralising the
 * effect that calls `dispatcher.segmentExplorerNodeAdd`.
 *
 * Why: vercel/next.js#80316 — `insert` inside next-devtools crashes with
 * "Cannot read properties of undefined (reading 'page.tsx')" the first
 * time a route node is registered. The crash takes over the dev overlay
 * and blocks all interaction with the page. The fix has not landed in a
 * stable Next release yet.
 *
 * This script is idempotent. It runs automatically before `next dev`.
 */
import fs from "node:fs";
import path from "node:path";

const targets = [
  "node_modules/next/dist/next-devtools/userspace/app/segment-explorer-node.js",
  "node_modules/next/dist/esm/next-devtools/userspace/app/segment-explorer-node.js",
];

const MARKER = "/* PATCHED: segment-explorer disabled */";

const PATTERNS = [
  // CJS variant compiled by SWC
  /\(0, _react\.useLayoutEffect\)\(\(\)=>\{\s*_nextdevtools\.dispatcher\.segmentExplorerNodeAdd\(nodeState\);\s*return \(\)=>\{\s*_nextdevtools\.dispatcher\.segmentExplorerNodeRemove\(nodeState\);\s*\};\s*\}, \[\s*nodeState\s*\]\);/,
  // ESM variant
  /useLayoutEffect\(\(\) => \{\s*dispatcher\.segmentExplorerNodeAdd\(nodeState\);\s*return \(\) => \{\s*dispatcher\.segmentExplorerNodeRemove\(nodeState\);\s*\};\s*\}, \[nodeState\]\);/,
];

const REPLACEMENT = `${MARKER} /* no-op effect */ void nodeState;`;

let patched = 0;
let skipped = 0;
let missing = 0;

for (const rel of targets) {
  const abs = path.resolve(process.cwd(), rel);
  if (!fs.existsSync(abs)) {
    missing++;
    continue;
  }
  const original = fs.readFileSync(abs, "utf8");
  if (original.includes(MARKER)) {
    skipped++;
    continue;
  }
  let next = original;
  let applied = false;
  for (const re of PATTERNS) {
    if (re.test(next)) {
      next = next.replace(re, REPLACEMENT);
      applied = true;
      break;
    }
  }
  if (!applied) {
    // Defensive: nuke calls if patterns drift slightly.
    next = next
      .replace(/_nextdevtools\.dispatcher\.segmentExplorerNodeAdd\([^)]*\);?/g, "/* no-op */")
      .replace(/_nextdevtools\.dispatcher\.segmentExplorerNodeRemove\([^)]*\);?/g, "/* no-op */")
      .replace(/dispatcher\.segmentExplorerNodeAdd\([^)]*\);?/g, "/* no-op */")
      .replace(/dispatcher\.segmentExplorerNodeRemove\([^)]*\);?/g, "/* no-op */");
    next = `${MARKER}\n${next}`;
    applied = next !== original;
  }
  if (applied) {
    fs.writeFileSync(abs, next, "utf8");
    patched++;
  } else {
    skipped++;
  }
}

const verb = patched > 0 ? "patched" : "already patched";
console.log(
  `[patch-next-devtools] ${verb}: ${patched}, skipped: ${skipped}, missing: ${missing}`,
);
