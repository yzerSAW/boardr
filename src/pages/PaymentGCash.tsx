import { useState } from "react";
import { Button } from "@/components/ui/button";
import { setUserPlan } from "@/lib/subscriptionStore";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"gcash" | "maya" | "bank">("gcash");

  const completePayment = () => {
    setUserPlan("premium");
    toast.success("Payment Successful (Mock)");
    navigate("/pricing");
  };

  return (
    <div className="pt-24 max-w-xl mx-auto px-6 space-y-4">

      <h1 className="text-2xl font-bold">Choose Payment Method</h1>

      {/* PAYMENT OPTIONS */}
      <div className="grid gap-3">

        <Card
          onClick={() => setMethod("gcash")}
          className={`p-4 cursor-pointer border ${
            method === "gcash" ? "border-primary" : ""
          }`}
        >
          <p className="font-bold">GCash</p>
          <p className="text-sm text-muted-foreground">
            Send via GCash mobile app
          </p>
        </Card>

        <Card
          onClick={() => setMethod("maya")}
          className={`p-4 cursor-pointer border ${
            method === "maya" ? "border-primary" : ""
          }`}
        >
          <p className="font-bold">Maya (PayMaya)</p>
          <p className="text-sm text-muted-foreground">
            Pay using Maya wallet
          </p>
        </Card>

        <Card
          onClick={() => setMethod("bank")}
          className={`p-4 cursor-pointer border ${
            method === "bank" ? "border-primary" : ""
          }`}
        >
          <p className="font-bold">Bank Transfer</p>
          <p className="text-sm text-muted-foreground">
            Transfer to bank account
          </p>
        </Card>
      </div>

      {/* DETAILS */}
      <div className="border rounded-xl p-4 bg-muted text-sm space-y-1">
        {method === "gcash" && (
          <>
            <p><b>GCash Number:</b> 0917-123-4567</p>
            <p><b>Name:</b> Maria Santos</p>
            <p><b>Amount:</b> ₱39</p>
          </>
        )}

        {method === "maya" && (
          <>
            <p><b>Maya Number:</b> 0998-555-1122</p>
            <p><b>Name:</b> Maria Santos</p>
            <p><b>Amount:</b> ₱39</p>
          </>
        )}

        {method === "bank" && (
          <>
            <p><b>Bank:</b> BDO</p>
            <p><b>Account Name:</b> Maria Santos</p>
            <p><b>Account No:</b> 1234-567-890</p>
            <p><b>Amount:</b> ₱39</p>
          </>
        )}
      </div>

      {/* CONFIRM */}
      <Button className="w-full" onClick={completePayment}>
        I Already Paid
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Mock payment system — no real transactions processed.
      </p>
    </div>
  );
}