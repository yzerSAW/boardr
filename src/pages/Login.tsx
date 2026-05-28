import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Eye, EyeOff, GraduationCap, Home } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ auto redirect if logged in
  useEffect(() => {
    const session = localStorage.getItem("user");
    if (session) {
      const user = JSON.parse(session);
      navigate(user.role === "landlord"
        ? "/landlord-dashboard"
        : "/customer-dashboard"
      );
    }
  }, []);

  const getUsers = () => {
    const stored = JSON.parse(localStorage.getItem("users") || "[]");

    const mockUsers = [
      { email: "student@test.com", password: "123456", role: "customer" },
      { email: "landlord@test.com", password: "123456", role: "landlord" },
    ];

    return [...mockUsers, ...stored];
  };

  const handleLogin = (role: "customer" | "landlord") => {
    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    const users = getUsers();

    const user = users.find(
      (u: any) =>
        u.email === email &&
        u.password === password &&
        u.role === role
    );

    if (!user) {
      toast.error("Invalid credentials");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Login successful");

    navigate(
      role === "landlord"
        ? "/landlord-dashboard"
        : "/customer-dashboard"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome back</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="customer">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="customer">
                <GraduationCap className="w-4 h-4" /> Student
              </TabsTrigger>
              <TabsTrigger value="landlord">
                <Home className="w-4 h-4" /> Landlord
              </TabsTrigger>
            </TabsList>

            {["customer", "landlord"].map((role) => (
              <TabsContent key={role} value={role} className="space-y-3">

                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-2"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleLogin(role as any)}
                >
                  Login as {role}
                </Button>
              </TabsContent>
            ))}
          </Tabs>

          <p className="text-sm text-center mt-4">
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;