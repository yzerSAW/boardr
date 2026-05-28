import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, Home, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import { schools } from "@/lib/mockData";
import { toast } from "sonner";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    school: "",
    phone: "",
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

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const emailExists = existingUsers.find(
      (u: any) => u.email === formData.email
    );

    if (emailExists) {
      toast.error("Email already exists");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role,
      school: formData.school,
      phone: formData.phone,
    };

    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-sm">
            <ArrowLeft className="w-4 h-4 inline" /> Back
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join BOARDR</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="customer">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="customer">Student</TabsTrigger>
                <TabsTrigger value="landlord">Landlord</TabsTrigger>
              </TabsList>

              {/* STUDENT */}
              <TabsContent value="customer" className="space-y-4">
                <Input placeholder="Full Name" value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)} />

                <Input placeholder="Email" value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)} />

                <Select onValueChange={(v) => updateField("school", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select School" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input type="password" placeholder="Password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)} />

                <Input type="password" placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)} />

                <Button className="w-full"
                  onClick={() => handleSignUp("customer")}>
                  Create Student Account
                </Button>
              </TabsContent>

              {/* LANDLORD */}
              <TabsContent value="landlord" className="space-y-4">
                <Input placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)} />

                <Input placeholder="Email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)} />

                <Input placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)} />

                <div className="border p-4 rounded text-center text-sm text-muted-foreground">
                  <Upload className="mx-auto mb-2" />
                  Upload ID (mock only)
                </div>

                <Input type="password" placeholder="Password"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)} />

                <Input type="password" placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)} />

                <Button className="w-full"
                  onClick={() => handleSignUp("landlord")}>
                  Create Landlord Account
                </Button>
              </TabsContent>
            </Tabs>

            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <CheckCircle className="w-4 h-4" />
              By signing up, you agree to terms
            </div>

            <p className="text-center text-sm mt-4">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;