import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockListings } from "@/lib/mockData";
import { toast } from "sonner";
import { useState } from "react";

export default function ReservePayment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = mockListings.find((l) => l.id === id);

  const [method, setMethod] = useState("gcash");

  const confirmPayment = () => {
    // MOCK: mark reservation as paid
    localStorage.setItem(`reserved-${id}`, "true");

    toast.success("Down payment sent (Mock)");

    // redirect to chat AFTER payment
    navigate(`/chat/${id}`);
  };

  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="pt-24 max-w-xl mx-auto px-6 space-y-4">

      <h1 className="text-xl font-bold">Reserve: {listing.title}</h1>

      {/* Payment Methods */}
      <div className="border rounded-xl p-4 space-y-3">
        <p className="font-semibold">Choose Payment Method</p>

        <div className="space-y-2">
          <Button
            variant={method === "gcash" ? "default" : "outline"}
            className="w-full"
            onClick={() => setMethod("gcash")}
          >
            GCash
          </Button>

          <Button
            variant={method === "bank" ? "default" : "outline"}
            className="w-full"
            onClick={() => setMethod("bank")}
          >
            Bank Transfer
          </Button>

          <Button
            variant={method === "cash" ? "default" : "outline"}
            className="w-full"
            onClick={() => setMethod("cash")}
          >
            Cash on Visit
          </Button>
        </div>
      </div>

      {/* Mock Payment Info */}
      <div className="bg-muted p-4 rounded-md text-sm space-y-1">
        <p><b>Send To:</b> Maria Santos</p>
        <p><b>GCash:</b> 0917-123-4567</p>
        <p><b>Down Payment:</b> ₱500 (Mock)</p>
      </div>

      <Button className="w-full" onClick={confirmPayment}>
        Confirm Reservation
      </Button>
    </div>
  );
}