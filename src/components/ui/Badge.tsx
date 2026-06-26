import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "pink" | "green" | "red" | "outline";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-white",
    gold: "bg-glamora-gold/20 text-glamora-gold border border-glamora-gold/30",
    pink: "bg-glamora-pink/20 text-glamora-pink border border-glamora-pink/30",
    green: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    red: "bg-red-500/20 text-red-400 border border-red-500/30",
    outline: "border border-white/20 text-white/80",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
