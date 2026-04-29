import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, GraduationCap, Home, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (role: "customer" | "landlord") => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`Logged in as ${role}`);
    navigate(role === "landlord" ? "/landlord-dashboard" : "/customer-dashboard");
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
            <CardTitle className="font-display text-2xl">Welcome Back</CardTitle>
            <CardDescription className="font-body">Sign in to your BOARDR account</CardDescription>
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

              {["customer", "landlord"].map((role) => (
                <TabsContent key={role} value={role} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-email`} className="font-display text-sm">Email</Label>
                    <Input
                      id={`${role}-email`}
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-password`} className="font-display text-sm">Password</Label>
                    <div className="relative">
                      <Input
                        id={`${role}-password`}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-11 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <a href="#" className="text-sm text-primary hover:underline font-body">Forgot password?</a>
                  </div>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold h-11"
                    onClick={() => handleLogin(role as "customer" | "landlord")}
                  >
                    Sign In as {role === "customer" ? "Student" : "Landlord"}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>

            <p className="text-center text-sm text-muted-foreground font-body mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
