import Link from "next/link";
import Image from "next/image";
import { asset, cn } from "@/lib/utils";

export function Logo({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "lg";
}) {
  const heightClass =
    size === "lg" ? "h-9 md:h-12" : "h-7 md:h-9";
  return (
    <Link
      href="/"
      aria-label="PURRMURE — на главную"
      className={cn(
        "inline-flex items-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-ink",
        className,
      )}
    >
      <Image
        src={asset("/logo.png")}
        alt="PURRMURE"
        width={900}
        height={194}
        priority
        className={cn("w-auto", heightClass)}
      />
    </Link>
  );
}
