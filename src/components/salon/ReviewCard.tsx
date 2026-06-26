import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Review } from "@/lib/data";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
          <Image src={review.customerAvatar} alt={review.customerName} fill className="object-cover" sizes="40px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm">{review.customerName}</span>
            <span className="flex items-center gap-1 text-emerald-400 text-xs">
              <CheckCircle className="w-3.5 h-3.5" />Verified
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <Rating value={review.rating} size="sm" />
            <span className="text-white/40 text-xs">{new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </div>
      <p className="text-white/70 text-sm leading-relaxed mb-3">{review.comment.en}</p>
      <Badge variant="default" className="text-xs">{review.service}</Badge>
    </div>
  );
}
