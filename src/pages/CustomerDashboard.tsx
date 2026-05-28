import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageSquare,
  User,
  Settings,
  LogOut,
  Search,
  Star,
  ChevronRight,
} from "lucide-react";
import { mockListings, mockInquiries } from "@/lib/mockData";
import ListingCard from "@/components/ListingCard";
import { motion } from "framer-motion";

const savedListings = mockListings.slice(0, 3);

const statusColors: Record<string, string> = {
  pending: "bg-gold/15 text-foreground border border-gold/30",
  replied: "bg-success/15 text-success border border-success/30",
  viewed: "bg-muted text-muted-foreground border border-border",
  closed: "bg-destructive/15 text-destructive border border-destructive/30",
};

const CustomerDashboard = () => {
  const navigate = useNavigate();

  // ✅ PERSISTED USER STATE
  const [user, setUser] = useState<any>(null);

  // ✅ LOAD USER ON REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login"); // redirect if no session
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
  }, []);

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
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                {user?.name?.charAt(0) || "U"}
              </div>

              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Welcome back, {user?.name || "User"}! 👋
                </h1>
                <p className="text-muted-foreground font-body text-sm">
                  {user?.school || "Student Account"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to="/listings">
                <Button variant="outline" className="gap-2 h-10">
                  <Search className="w-4 h-4" /> Browse
                </Button>
              </Link>

              <Link to="/inquiry">
                <Button className="gap-2 h-10">
                  <MessageSquare className="w-4 h-4" /> Messages
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Heart, value: "3", label: "Saved Listings", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: MessageSquare, value: "3", label: "Active Inquiries", color: "bg-gold/15", iconColor: "text-gold" },
              { icon: Star, value: "2", label: "Reviews Given", color: "bg-success/10", iconColor: "text-success" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* TABS */}
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="mb-6 h-12">
              <TabsTrigger value="saved"><Heart className="w-4 h-4" /> Saved</TabsTrigger>
              <TabsTrigger value="inquiries"><MessageSquare className="w-4 h-4" /> Inquiries</TabsTrigger>
              <TabsTrigger value="profile"><User className="w-4 h-4" /> Profile</TabsTrigger>
            </TabsList>

            {/* SAVED */}
            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedListings.map((l) => (
                  <ListingCard key={l.id} listing={l} />
                ))}
              </div>
            </TabsContent>

            {/* INQUIRIES */}
            <TabsContent value="inquiries">
              <div className="space-y-3">
                {mockInquiries.map((inq) => (
                  <Card key={inq.id}>
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-semibold">
                          {inq.listingTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {inq.lastMessage}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${statusColors[inq.status]} text-xs`}>
                            {inq.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {inq.timestamp}
                          </span>
                        </div>
                      </div>

                      <Link to="/inquiry">
                        <Button variant="ghost" size="sm" className="gap-1 text-primary">
                          Open <ChevronRight className="w-4 h-4" />
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
                  <CardTitle>My Profile</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {user?.name?.charAt(0) || "U"}
                    </div>

                    <div>
                      <p className="font-bold">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.role === "landlord" ? "Landlord" : "Student"}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="gap-2">
                      <Settings className="w-4 h-4" /> Edit Profile
                    </Button>

                    <Button
                      variant="destructive"
                      className="gap-2"
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

export default CustomerDashboard;