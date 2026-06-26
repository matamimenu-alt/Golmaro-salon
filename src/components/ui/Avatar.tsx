import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, alt, name, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const initials = name
    ? name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-glamora-gold to-glamora-pink flex-shrink-0",
      sizes[size],
      className
    )}>
      {src ? (
        <Image
          src={src}
          alt={alt || name || "avatar"}
          fill
          className="object-cover"
          sizes="80px"
        />
      ) : (
        <span className="font-semibold text-white">{initials}</span>
      )}
    </div>
  );
}
