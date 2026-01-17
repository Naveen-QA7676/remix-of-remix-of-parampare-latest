import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

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
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGetOTP = () => {
    if (validateForm()) {
      navigate("/verify-otp", { 
        state: { 
          identifier: formData.mobile, 
          isLogin: false,
          userData: formData,
          returnTo: "/" 
        } 
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

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

          <div className="flex-1 flex items-center justify-center p-8">
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
                    Full Name
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
                    Mobile Number
                  </label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className={`h-12 ${errors.mobile ? "border-destructive" : ""}`}
                  />
                  {errors.mobile && (
                    <p className="text-destructive text-sm mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-muted-foreground">(optional)</span>
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

                <p className="text-sm text-muted-foreground">
                  We'll send a one-time password (OTP) to verify you
                </p>

                <Button 
                  onClick={handleGetOTP}
                  className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground font-medium"
                >
                  Get OTP
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
