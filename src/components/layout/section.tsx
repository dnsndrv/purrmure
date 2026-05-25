import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  full = false,
}: {
  children: React.ReactNode;
  className?: string;
  full?: boolean;
}) {
  return (
    <section className={cn("py-10 md:py-14", className)}>
      <div
        className={cn(
          "mx-auto w-full px-4 md:px-8",
          full ? "" : "max-w-[1280px]",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionTitle({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-3xl md:text-5xl font-semibold tracking-tight text-ink mb-6",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </h2>
  );
}
