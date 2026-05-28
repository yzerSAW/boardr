export type PlanType = "free" | "premium";

export interface UserSubscription {
  userId: string;
  plan: PlanType;
  expiresAt?: string;
}

export const getUserPlan = (): PlanType => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return "free";

  const sub = JSON.parse(localStorage.getItem("subscription") || "null");
  return sub?.plan || "free";
};

export const setUserPlan = (plan: PlanType) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;

  localStorage.setItem(
    "subscription",
    JSON.stringify({
      userId: user.email,
      plan,
      expiresAt: plan === "premium" ? "9999-12-31" : undefined,
    })
  );
};