import Image from "next/image";
import { Staff } from "@/lib/data";
import { Rating } from "@/components/ui/Rating";

interface StaffCardProps {
  staff: Staff;
}

export default function StaffCard({ staff }: StaffCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-glamora-gold/20 transition-all">
      <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-glamora-gold/30">
        <Image src={staff.photo} alt={staff.name} fill className="object-cover" sizes="80px" />
      </div>
      <h3 className="text-white font-semibold text-sm mb-0.5">{staff.name}</h3>
      <p className="text-glamora-gold text-xs mb-1">{staff.role.en}</p>
      <p className="text-white/50 text-xs mb-2">{staff.specialty}</p>
      <Rating value={staff.rating} size="sm" showValue className="justify-center" />
    </div>
  );
}
