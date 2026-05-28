import { Button } from "@/components/ui/button";
import { setUserPlan, getUserPlan } from "@/lib/subscriptionStore";
import { toast } from "sonner";

export default function PricingCard() {
  const plan = getUserPlan();

  const upgrade = () => {
    setUserPlan("premium");
    toast.success("Upgraded to Premium (Mock)");
    window.location.reload();
  };

  const downgrade = () => {
    setUserPlan("free");
    toast.success("Switched to Free Plan");
    window.location.reload();
  };

  return (
    <div className="border rounded-xl p-5 space-y-3">
      <h2 className="text-lg font-bold">Subscription Plan</h2>

      <p className="text-sm text-muted-foreground">
        Current plan: <b>{plan.toUpperCase()}</b>
      </p>

      {plan === "free" ? (
        <Button onClick={upgrade} className="w-full">
          Upgrade to Premium (₱39 mock)
        </Button>
      ) : (
        <Button onClick={downgrade} variant="outline" className="w-full">
          Downgrade to Free
        </Button>
      )}
    </div>
  );
}