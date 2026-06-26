import { Salon } from "@/lib/data";
import SalonCard from "./SalonCard";

interface SalonGridProps {
  salons: Salon[];
  title?: string;
  subtitle?: string;
}

export default function SalonGrid({ salons, title, subtitle }: SalonGridProps) {
  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>}
          {subtitle && <p className="text-white/60">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {salons.map((salon, i) => (
          <SalonCard key={salon.id} salon={salon} index={i} />
        ))}
      </div>
    </div>
  );
}
