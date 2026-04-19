import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Lock, Eye, EyeOff, Loader2, ArrowLeft, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const initialEmail = location.state?.email || "";
  
  const [email, setEmail] = useState(initialEmail);
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!resetCode.trim()) newErrors.resetCode = "Reset code is required";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        await apiClient.post("/auth/reset-password", { 
          email, 
          token: resetCode, 
          newPassword: password 
        });
        
        toast({
          title: "Password Reset Successful",
          description: "You can now log in with your new password.",
        });
        navigate("/login");
      } catch (err: any) {
        toast({
          title: "Reset Failed",
          description: err.response?.data?.message || err.message || "Invalid or expired reset code.",
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
                <Link to="/forgot-password" className="inline-flex items-center text-sm text-muted-foreground hover:text-gold mb-6">
                  <ArrowLeft className="h-4 w-4 mr-1" /> Back
                </Link>
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Reset Password
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Enter the verification code sent to your email along with your new password.
                </p>
              </div>

              <div className="space-y-4">
                {!initialEmail && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input type="email" value={email} onChange={e => {setEmail(e.target.value); setErrors(p => ({...p, email: ""}))}} className={errors.email ? "border-destructive" : ""} />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1">Reset Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      value={resetCode} 
                      onChange={e => {setResetCode(e.target.value); setErrors(p => ({...p, resetCode: ""}))}} 
                      placeholder="Enter 6-digit code"
                      className={`pl-10 ${errors.resetCode ? "border-destructive" : ""}`} 
                    />
                  </div>
                  {errors.resetCode && <p className="text-destructive text-xs mt-1">{errors.resetCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={e => {setPassword(e.target.value); setErrors(p => ({...p, password: ""}))}}
                      placeholder="At least 8 characters"
                      className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`} 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword} 
                      onChange={e => {setConfirmPassword(e.target.value); setErrors(p => ({...p, confirmPassword: ""}))}}
                      placeholder="Confirm new password"
                      className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`} 
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                <Button 
                  onClick={handleResetPassword}
                  className="w-full h-12 bg-maroon hover:bg-maroon-dark text-white font-medium mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Resetting...</> : "Reset Password"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
