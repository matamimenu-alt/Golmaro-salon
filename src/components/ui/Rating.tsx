import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function Rating({ value, max = 5, size = "md", showValue = false, className }: RatingProps) {
  const sizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizes[size],
            i < Math.floor(value) ? "fill-glamora-gold text-glamora-gold" : "text-white/20"
          )}
        />
      ))}
      {showValue && (
        <span className="text-glamora-gold font-semibold ml-1 text-sm">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
