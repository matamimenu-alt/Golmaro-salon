import Link from "next/link";
import { Clock } from "lucide-react";
import { Service } from "@/lib/data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-glamora-gold/30 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="default" className="text-xs">{service.category}</Badge>
        </div>
        <h3 className="text-white font-semibold text-sm">{service.name.en}</h3>
        <div className="flex items-center gap-3 mt-1 text-white/50 text-xs">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{service.duration} min</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="text-glamora-gold font-bold">SAR {service.price}</span>
        <Link href={`/booking?serviceId=${service.id}`}>
          <Button size="sm" variant="outline">Book</Button>
        </Link>
      </div>
    </div>
  );
}
