// src/pages/PricingPreview.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

export default function PricingPreview() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 max-w-xl mx-auto px-6 text-center space-y-4">
      <div className="border rounded-xl p-8 space-y-4">
        <Lock className="w-10 h-10 mx-auto text-muted-foreground" />

        <h1 className="text-xl font-bold">Pricing is Locked</h1>

        <p className="text-sm text-muted-foreground">
          You must log in to view subscription plans and upgrade options.
        </p>

        <div className="flex gap-2 justify-center pt-2">
          <Button onClick={() => navigate("/login")}>
            Login
          </Button>

          <Button variant="outline" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}