import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  const freeFeatures = [
    "Search & browse listings",
    "View photos, amenities, pricing",
    "Compare listings side by side",
  ];

  const premiumFeatures = [
    "Full Map Navigation & Road View",
    "Unlimited Saved Listings",
    "Verified Tenant Badge",
    "24-Hour Priority Access",
    "Near Me Proximity Filter",
    "On-Platform Chat & Inquiries",
    "Rent Payments & Receipts",
    "Room Reservation Hold",
    "Roommate Matching Filter",
  ];

  return (
    <div className="pt-24 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">

      {/* FREE */}
      <div className="border rounded-xl p-5">
        <h2 className="text-xl font-bold mb-3">Free Board</h2>

        <ul className="space-y-2 text-sm">
          {freeFeatures.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>

        <Button disabled className="w-full mt-5">
          Current Plan
        </Button>
      </div>

      {/* PREMIUM */}
      <div className="border rounded-xl p-5 bg-gold/10">
        <h2 className="text-xl font-bold mb-3">Advance Board</h2>
        <p className="text-sm mb-3">₱39 / month (mock)</p>

        <ul className="space-y-2 text-sm">
          {premiumFeatures.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>

        <Button
          className="w-full mt-5"
          onClick={() => navigate("/payment-gcash")}
        >
          Upgrade Now
        </Button>
      </div>
    </div>
  );
}