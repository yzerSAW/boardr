import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/AppShell";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Listings from "./pages/Listings.tsx";
import ListingDetails from "./pages/ListingDetails.tsx";
import Inquiry from "./pages/Inquiry.tsx";
import CustomerDashboard from "./pages/CustomerDashboard.tsx";
import LandlordDashboard from "./pages/LandlordDashboard.tsx";
import AddListing from "./pages/AddListing.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import Pricing from "./pages/Pricing.tsx";
import PaymentGCash from "./pages/PaymentGCash.tsx";
import { getUser } from "@/lib/auth";
import { Navigate } from "react-router-dom";
import ReservePayment from "./pages/ReservePayment.tsx";
import Chat from "./pages/Chat.tsx";
import PricingPreview
 from "./PricingPreview.tsx";
const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = getUser();

  if (!user) {
    return <Navigate to="/pricing-preview" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
            <Route path="/add-listing" element={<AddListing />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/payment-gcash" element={<PaymentGCash />} />
            <Route path="/reserve/:id" element={<ReservePayment />} />
            <Route path="/chat/:id" element={<Chat />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            <Route path="/pricing-preview" element={<PricingPreview />} />

<Route
  path="/pricing"
  element={
    <RequireAuth>
      <Pricing />
    </RequireAuth>
  }
/>
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
