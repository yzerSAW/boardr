import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, Home, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { schools } from "@/lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", confirmPassword: "", school: "", phone: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = (role: "customer" | "landlord") => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-body transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <Link to="/">
            <span className="font-display font-bold text-2xl text-foreground">
              BOARD<span className="text-gold">R</span>
            </span>
          </Link>
        </div>

        <Card className="shadow-elevated border-border/60">
          <CardHeader className="text-center pb-2">
            <CardTitle className="font-display text-2xl">Create Account</CardTitle>
            <CardDescription className="font-body">Join BOARDR — it's free</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
                <TabsTrigger value="customer" className="font-display text-sm gap-2 h-10">
                  <GraduationCap className="w-4 h-4" /> Student
                </TabsTrigger>
                <TabsTrigger value="landlord" className="font-display text-sm gap-2 h-10">
                  <Home className="w-4 h-4" /> Landlord
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customer" className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-display text-sm">Full Name *</Label>
                  <Input placeholder="Juan dela Cruz" value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Email *</Label>
                  <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">School *</Label>
                  <Select onValueChange={(v) => updateField("school", v)}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select your school" /></SelectTrigger>
                    <SelectContent>
                      {schools.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Password *</Label>
                  <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Confirm Password *</Label>
                  <Input type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} className="h-11" />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold h-11" onClick={() => handleSignUp("customer")}>
                  Create Student Account
                </Button>
              </TabsContent>

              <TabsContent value="landlord" className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-display text-sm">Full Name *</Label>
                  <Input placeholder="Maria Santos" value={formData.name} onChange={(e) => updateField("name", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Email *</Label>
                  <Input type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Phone Number *</Label>
                  <Input type="tel" placeholder="0917-XXX-XXXX" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">ID Verification</Label>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                    <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-sm text-muted-foreground font-body">Upload valid ID for KYC verification</p>
                    <p className="text-xs text-muted-foreground font-body mt-1">JPG, PNG, PDF up to 5MB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Password *</Label>
                  <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => updateField("password", e.target.value)} className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="font-display text-sm">Confirm Password *</Label>
                  <Input type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} className="h-11" />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold h-11" onClick={() => handleSignUp("landlord")}>
                  Create Landlord Account
                </Button>
              </TabsContent>
            </Tabs>

            <div className="flex items-start gap-2 mt-4 p-3 bg-muted/50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground font-body">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
            </div>

            <p className="text-center text-sm text-muted-foreground font-body mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
