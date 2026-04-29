import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, User, Settings, LogOut, Search, Star, ChevronRight } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-muted/20">
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">CR</div>
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">Welcome back, Carlo! 👋</h1>
                <p className="text-muted-foreground font-body text-sm">USTP • Student Account</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/listings">
                <Button variant="outline" className="font-display gap-2 h-10"><Search className="w-4 h-4" /> Browse</Button>
              </Link>
              <Link to="/inquiry">
                <Button className="bg-primary text-primary-foreground font-display gap-2 h-10"><MessageSquare className="w-4 h-4" /> Messages</Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Heart, value: "3", label: "Saved Listings", color: "bg-primary/10", iconColor: "text-primary" },
              { icon: MessageSquare, value: "3", label: "Active Inquiries", color: "bg-gold/15", iconColor: "text-gold" },
              { icon: Star, value: "2", label: "Reviews Given", color: "bg-success/10", iconColor: "text-success" },
            ].map((stat) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-border/60">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="mb-6 h-12">
              <TabsTrigger value="saved" className="font-display gap-2 h-10"><Heart className="w-4 h-4" /> Saved</TabsTrigger>
              <TabsTrigger value="inquiries" className="font-display gap-2 h-10"><MessageSquare className="w-4 h-4" /> Inquiries</TabsTrigger>
              <TabsTrigger value="profile" className="font-display gap-2 h-10"><User className="w-4 h-4" /> Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedListings.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div>
            </TabsContent>

            <TabsContent value="inquiries">
              <div className="space-y-3">
                {mockInquiries.map((inq) => (
                  <Card key={inq.id} className="border-border/60 hover:shadow-card transition-shadow">
                    <CardContent className="p-5 flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display font-semibold text-foreground">{inq.listingTitle}</h3>
                        <p className="text-sm text-muted-foreground font-body mt-1 truncate">{inq.lastMessage}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${statusColors[inq.status]} text-xs font-display`}>{inq.status}</Badge>
                          <span className="text-xs text-muted-foreground">{inq.timestamp}</span>
                        </div>
                      </div>
                      <Link to="/inquiry">
                        <Button variant="ghost" size="sm" className="font-display gap-1 text-primary shrink-0 ml-4">
                          Open <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <Card className="border-border/60 max-w-lg">
                <CardHeader><CardTitle className="font-display">My Profile</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl">CR</div>
                    <div>
                      <p className="font-display font-bold text-foreground">Carlo Reyes</p>
                      <p className="text-sm text-muted-foreground font-body">carlo@email.com</p>
                      <p className="text-xs text-muted-foreground font-body mt-0.5">USTP • Student</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="font-display gap-2"><Settings className="w-4 h-4" /> Edit Profile</Button>
                    <Link to="/login">
                      <Button variant="ghost" className="text-destructive font-display gap-2"><LogOut className="w-4 h-4" /> Logout</Button>
                    </Link>
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
