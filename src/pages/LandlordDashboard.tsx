import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  MessageSquare,
  Plus,
  User,
  Settings,
  LogOut,
  Eye,
  Star,
} from "lucide-react";
import { mockListings, mockInquiries } from "@/lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Load user-created listings
const storedListings = JSON.parse(localStorage.getItem("listings") || "[]");

// Merge mock + created
const myListings = [...mockListings, ...storedListings];

const LandlordDashboard = () => {
  const navigate = useNavigate();

  // ✅ USER STATE (PERSISTED)
  const [user, setUser] = useState<any>(null);

  // ✅ LOAD SESSION ON REFRESH
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(stored);

    // optional safety: ensure correct role
    if (parsed.role !== "landlord") {
      navigate("/login");
      return;
    }

    setUser(parsed);
  }, []);

  // fake availability state (unchanged logic)
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(myListings.map((l) => [l.id, l.available]))
  );

  const toggleAvailability = (id: string) => {
    setAvailability((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      toast.success(`Listing marked as ${next[id] ? "available" : "occupied"}`);
      return next;
    });
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
          >
            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-gold flex items-center justify-center text-foreground font-display font-bold text-lg">
                {user?.name?.charAt(0) || "L"}
              </div>

              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Welcome back, {user?.name || "Landlord"}! 👋
                </h1>

                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-muted-foreground font-body text-sm">
                    Landlord Account
                  </p>

                  <Badge className="bg-gold/15 text-foreground font-display text-[10px] border border-gold/30">
                    {user?.verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
            </div>

            <Link to="/add-listing">
              <Button className="bg-gold text-foreground hover:bg-gold/90 font-display gap-2 h-10">
                <Plus className="w-4 h-4" /> Add Listing
              </Button>
            </Link>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Home, value: "3", label: "My Listings", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: MessageSquare, value: "5", label: "Inquiries", color: "bg-gold/15", iconColor: "text-gold" },
              { icon: Eye, value: "142", label: "Views", color: "bg-success/10", iconColor: "text-success" },
              { icon: Star, value: "4.8", label: "Rating", color: "bg-primary/10", iconColor: "text-primary" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-xl font-display font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TABS */}
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="mb-6 h-12">
              <TabsTrigger value="listings"><Home className="w-4 h-4" /> Listings</TabsTrigger>
              <TabsTrigger value="inquiries"><MessageSquare className="w-4 h-4" /> Inquiries</TabsTrigger>
              <TabsTrigger value="profile"><User className="w-4 h-4" /> Profile</TabsTrigger>
            </TabsList>

            {/* LISTINGS */}
            <TabsContent value="listings">
              <div className="space-y-3">
                {myListings.map((listing) => (
                  <Card key={listing.id}>
                    <CardContent className="p-4 flex gap-4">
                      <img
                        src={listing.images[0]}
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="font-display font-semibold">
                          {listing.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {listing.address} · ₱{listing.price.toLocaleString()}/mo
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* INQUIRIES */}
            <TabsContent value="inquiries">
              <div className="space-y-3">
                {mockInquiries.map((inq) => (
                  <Card key={inq.id}>
                    <CardContent className="p-5 flex justify-between">
                      <div>
                        <h3 className="font-display font-semibold">
                          {inq.studentName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Re: {inq.listingTitle}
                        </p>
                      </div>

                      <Link to="/inquiry">
                        <Button size="sm">
                          Reply
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* PROFILE */}
            <TabsContent value="profile">
              <Card className="max-w-lg">
                <CardHeader>
                  <CardTitle>Landlord Profile</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gold flex items-center justify-center font-bold text-xl">
                      {user?.name?.charAt(0) || "L"}
                    </div>

                    <div>
                      <p className="font-bold">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Landlord
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Settings className="w-4 h-4" /> Edit
                    </Button>

                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;