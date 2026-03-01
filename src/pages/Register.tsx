import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/apiClient";

const passwordRules = [
  { rule: /.{8,}/, message: "At least 8 characters" },
  { rule: /[A-Z]/, message: "At least one uppercase letter" },
  { rule: /[a-z]/, message: "At least one lowercase letter" },
  { rule: /[0-9]/, message: "At least one number" },
  { rule: /[@$!%*?&#^()_+=\-\[\]{}|\\:;"'<>,.?/~`]/, message: "At least one special character" },
];

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getPasswordValidation = (password: string) => {
    return passwordRules.map((rule) => ({
      ...rule,
      passed: rule.rule.test(password),
    }));
  };

  const isPasswordValid = (password: string) => {
    return passwordRules.every((rule) => rule.rule.test(password));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isPasswordValid(formData.password)) {
      newErrors.password = "Password does not meet all requirements";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          mobile: formData.mobile,
          countryCode: "+91",
          confirmPassword: formData.confirmPassword
        };

        const res = await apiClient.post("/auth/register", payload);

        const data = res.data;

        toast({
          title: "Registration Successful",
          description: "Sending OTP...",
        });

        // Send OTP
        const otpRes = await apiClient.post("/auth/send-otp", {
          mobile: formData.mobile,
          type: "register"
        });

        if (!otpRes) {
           console.error("Failed to send OTP");
           toast({
             title: "Warning",
             description: "Account created but failed to send OTP. You may need to resend it.",
             variant: "destructive"
           });
        } else {
           toast({
             title: "OTP Sent",
             description: "Please check your mobile number.",
           });
        }

        // Store user data context for OTP verification if needed
        navigate("/verify-otp", { 
          state: { 
            identifier: formData.mobile, 
            isLogin: false,
            userData: formData,
            apiResponse: data, // Pass registration data
            returnTo: "/" 
          } 
        });
      } catch (error: any) {
        toast({
          title: "Registration Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const passwordValidation = getPasswordValidation(formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left Side - Dark Maroon Branding (Same as Login) */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#3d2a2a] flex-col items-center justify-center p-8">
          <div className="text-center mb-6">
            <p className="text-cream/80 text-sm mb-1 font-body">Join</p>
            <h1 className="text-3xl font-display font-bold text-cream mb-1">ಪರಂಪರೆ</h1>
            <p className="text-cream/80 text-sm tracking-wide font-body">Authentic Ilkal Sarees</p>
          </div>
          
          {/* Loom & Saree Stack Illustration */}
          <div className="relative w-48 h-56">
            <svg viewBox="0 0 280 300" className="w-full h-full">
              {/* Loom Frame - Wooden Brown */}
              <rect x="40" y="30" width="12" height="180" fill="#8B6914" rx="3"/>
              <rect x="228" y="30" width="12" height="180" fill="#8B6914" rx="3"/>
              <rect x="35" y="20" width="210" height="18" fill="#a67c00" rx="4"/>
              <rect x="35" y="200" width="210" height="12" fill="#a67c00" rx="3"/>
              
              {/* Loom top beam */}
              <rect x="50" y="38" width="180" height="8" fill="#654321" rx="2"/>
              
              {/* Warp threads - vertical golden threads */}
              {[...Array(18)].map((_, i) => (
                <line 
                  key={i} 
                  x1={65 + i * 10} 
                  y1="46" 
                  x2={65 + i * 10} 
                  y2="195" 
                  stroke="#D4AF37" 
                  strokeWidth="1.5"
                  opacity="0.9"
                />
              ))}
              
              {/* Woven fabric on loom */}
              <rect x="58" y="80" width="164" height="110" fill="#C41E3A" rx="2"/>
              
              {/* Fabric pattern - horizontal stripes */}
              <rect x="58" y="80" width="164" height="18" fill="#D4AF37"/>
              <rect x="58" y="172" width="164" height="18" fill="#D4AF37"/>
              
              {/* Weaving shuttle */}
              <ellipse cx="140" cy="140" rx="35" ry="8" fill="#654321"/>
              <ellipse cx="140" cy="140" rx="25" ry="5" fill="#8B4513"/>
              
              {/* Folded Saree Stack */}
              <g transform="translate(70, 220)">
                {/* Bottom saree - Green */}
                <rect x="0" y="50" width="140" height="18" fill="#2d5a4a" rx="3"/>
                <rect x="0" y="50" width="140" height="4" fill="#D4AF37" rx="1"/>
                
                {/* Middle saree - Maroon */}
                <rect x="10" y="35" width="120" height="18" fill="#8B0000" rx="3"/>
                <rect x="10" y="35" width="120" height="4" fill="#D4AF37" rx="1"/>
                
                {/* Top saree - Golden/Yellow */}
                <rect x="20" y="20" width="100" height="18" fill="#DAA520" rx="3"/>
                <rect x="20" y="20" width="100" height="4" fill="#228B22" rx="1"/>
                
                {/* Topmost saree - Orange */}
                <rect x="30" y="5" width="80" height="18" fill="#FF8C00" rx="3"/>
                <rect x="30" y="5" width="80" height="4" fill="#C41E3A" rx="1"/>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex flex-col bg-card">
          {/* Back to Home Header */}
          <div className="p-4 border-b border-border/50">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Back to ಪರಂಪರೆ</span>
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
            <div className="w-full max-w-sm">
              {/* Registration Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
                  Create Account
                </h2>
                <p className="text-muted-foreground text-sm">Join the Parampare family</p>
              </div>

              {/* Registration Form */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className={`h-12 ${errors.fullName ? "border-destructive" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-destructive text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                    Mobile Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground border-r border-border pr-2 mr-2">
                       <span className="text-lg">🇮🇳</span>
                       <span className="text-sm font-medium text-foreground">+91</span>
                    </div>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className={`h-12 pl-24 ${errors.mobile ? "border-destructive" : ""}`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-destructive text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`h-12 ${errors.email ? "border-destructive" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                      className={`h-12 pr-10 ${errors.password ? "border-destructive" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">{errors.password}</p>
                  )}
                  
                  {/* Password Strength Indicators */}
                  {(passwordFocused || formData.password) && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-lg space-y-2">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Password must contain:</p>
                      {passwordValidation.map((validation, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs">
                          {validation.passed ? (
                            <Check className="h-3.5 w-3.5 text-green-600" />
                          ) : (
                            <X className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                          <span className={validation.passed ? "text-green-600" : "text-muted-foreground"}>
                            {validation.message}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                    Confirm Password <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className={`h-12 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
                      <Check className="h-4 w-4" /> Passwords match
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleRegister}
                  className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground font-medium"
                  disabled={!isPasswordValid(formData.password) || formData.password !== formData.confirmPassword || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                {/* Helper Links */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-gold hover:underline font-medium">
                      Login
                    </Link>
                  </p>
                </div>

                {/* Terms */}
                <p className="text-xs text-center text-muted-foreground">
                  By continuing, you agree to Parampare's{" "}
                  <Link to="/terms-of-use" className="text-gold hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
