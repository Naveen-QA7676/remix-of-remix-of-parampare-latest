import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  fullName: string;
  email: string;
  phone: string;
}

const YourAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [editData, setEditData] = useState<UserData>({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login", { state: { returnTo: "/account" } });
      return;
    }

    // Load user data from localStorage
    const storedUser = localStorage.getItem("parampare_user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserData({
        fullName: parsed.fullName || parsed.name || "Guest User",
        email: parsed.email || "",
        phone: parsed.phone || parsed.mobile || "",
      });
      setEditData({
        fullName: parsed.fullName || parsed.name || "Guest User",
        email: parsed.email || "",
        phone: parsed.phone || parsed.mobile || "",
      });
    }
  }, [navigate]);

  const handleSave = () => {
    // Validate
    if (!editData.fullName.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }
    if (!editData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    const storedUser = JSON.parse(localStorage.getItem("parampare_user") || "{}");
    const updatedUser = {
      ...storedUser,
      fullName: editData.fullName,
      email: editData.email,
      phone: editData.phone,
    };
    localStorage.setItem("parampare_user", JSON.stringify(updatedUser));
    setUserData(editData);
    setIsEditing(false);

    toast({
      title: "Profile Updated",
      description: "Your account details have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <TopUtilityHeader />
      <MainHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-gold">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Your Account</span>
        </nav>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-display font-semibold text-foreground mb-8">
            Your Account
          </h1>

          <div className="bg-card rounded-xl border border-border/50 shadow-soft p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-foreground">Profile Information</h2>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="gap-2 bg-gold hover:bg-gold/90 text-foreground"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={editData.fullName}
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium text-foreground mt-1">{userData.fullName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground">Email Address</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-medium text-foreground mt-1">{userData.email || "Not provided"}</p>
                  )}
                </div>
              </div>

              {/* Phone - Not Editable */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground">
                    Phone Number
                    <span className="ml-2 text-xs text-gold">(Cannot be changed)</span>
                  </label>
                  <p className="font-medium text-foreground mt-1">+91 {userData.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default YourAccount;
