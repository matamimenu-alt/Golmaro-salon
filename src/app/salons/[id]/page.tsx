import { notFound } from "next/navigation";
import { salons, reviews } from "@/lib/data";
import SalonClientPage from "./SalonClientPage";

export function generateStaticParams() {
  return salons.map(salon => ({ id: salon.id }));
}

export default function SalonPage({ params }: { params: { id: string } }) {
  const salon = salons.find(s => s.id === params.id);
  if (!salon) notFound();

  const salonReviews = reviews.filter(r => r.salonId === salon.id);

  return <SalonClientPage salon={salon} salonReviews={salonReviews} allReviews={reviews} />;
}
