import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Mail, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSendResetLink = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        await apiClient.post("/auth/forgot-password", { email });
        toast({
          title: "Reset Code Sent",
          description: "If an account exists, a reset code has been sent to your email.",
        });
        navigate("/reset-password", { state: { email } });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err.response?.data?.message || err.message || "Failed to initiate password reset",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left Side Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#3d2a2a] flex-col items-center justify-center p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-display font-bold text-cream mb-1">ಪರಂಪರೆ</h1>
            <p className="text-cream/80 text-sm tracking-wide font-body">Authentic Ilkal Sarees</p>
          </div>
          <div className="relative w-48 h-56">
            <svg viewBox="0 0 280 300" className="w-full h-full">
              {/* Loom SVG omitted for brevity but mirroring the aesthetic */}
              <rect x="40" y="30" width="12" height="180" fill="#8B6914" rx="3"/>
              <rect x="228" y="30" width="12" height="180" fill="#8B6914" rx="3"/>
              <rect x="35" y="20" width="210" height="18" fill="#a67c00" rx="4"/>
              <rect x="50" y="38" width="180" height="8" fill="#654321" rx="2"/>
              <rect x="58" y="80" width="164" height="110" fill="#C41E3A" rx="2"/>
              <ellipse cx="140" cy="140" rx="35" ry="8" fill="#654321"/>
              <ellipse cx="140" cy="140" rx="25" ry="5" fill="#8B4513"/>
            </svg>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-card">
          <div className="p-4 border-b border-border/50">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <div className="mb-6">
                <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-gold mb-6">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
                </Link>
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Forgot Password
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Enter your registered email address and we'll send you a secure link to reset your password.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      className={`h-12 pl-10 ${error ? "border-destructive" : ""}`}
                    />
                  </div>
                  {error && <p className="text-destructive text-sm mt-1">{error}</p>}
                </div>

                <Button 
                  onClick={handleSendResetLink}
                  className="w-full h-12 bg-maroon hover:bg-maroon-dark text-white font-medium mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                  ) : "Send Reset Code"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
