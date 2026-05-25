import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:bg-accent/90 active:bg-accent/80",
        secondary:
          "bg-ink text-white hover:bg-ink/85 active:bg-ink/75",
        outline:
          "border border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
        ghost: "bg-transparent text-ink hover:bg-surface",
        link: "bg-transparent text-ink underline-offset-4 hover:underline px-0 h-auto tracking-[0.12em]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4 text-[11px]",
        lg: "h-12 px-7 text-[13px]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
