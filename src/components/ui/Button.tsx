"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-glamora-gold/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-glamora-gold to-glamora-pink text-white hover:opacity-90 shadow-lg shadow-glamora-gold/20",
        outline: "border border-glamora-gold text-glamora-gold hover:bg-glamora-gold/10",
        ghost: "text-white/80 hover:text-white hover:bg-white/10",
        pink: "bg-gradient-to-r from-glamora-pink to-glamora-pink-dark text-white hover:opacity-90 shadow-lg shadow-glamora-pink/20",
        dark: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
        white: "bg-white text-glamora-dark hover:bg-white/90 shadow-lg",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
