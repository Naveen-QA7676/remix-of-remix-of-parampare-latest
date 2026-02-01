import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Home, Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LoginMode = "password" | "otp";

const Login = () => {
  const [loginMode, setLoginMode] = useState<LoginMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const returnTo = location.state?.returnTo || "/";
  const API_URL = import.meta.env.VITE_API_URL || "https://paramparebackend.vercel.app";

  const validatePasswordLogin = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtpLogin = () => {
    const newErrors: Record<string, string> = {};
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phone.trim()) {
      newErrors.phone = "Please enter a mobile number";
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordLogin = async () => {
    if (validatePasswordLogin()) {
      setIsLoading(true);
      try {
        // 1. Password Login
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.status === 401 || response.status === 400 || !response.ok) {
           // Handle specific auth errors
           if (data.message === "Invalid credentials" || data.message === "Incorrect password") {
             setErrors(prev => ({ ...prev, password: "Incorrect password. Please try again." }));
             throw new Error("Incorrect password"); // Specific error to stop flow but handled in catch
           }
           throw new Error(data.message || "Login failed");
        }

        // Store token
        const token = data.token;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("isLoggedIn", "true");

        // 2. Fetch User Details
        const userDetailsResponse = await fetch(`${API_URL}/api/auth/userDetails`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Assuming Bearer token
          },
        });

        if (userDetailsResponse.ok) {
           const responseJson = await userDetailsResponse.json();
           const userData = responseJson.data || responseJson; // Handle wrapped or unwrapped data
           
           // Store user details (ensure consistency with what app expects)
           const userToStore = {
             email: userData.email,
             fullName: userData.fullName || userData.name, 
             phone: userData.mobile || userData.phone || "",
             countryCode: userData.countryCode,
             _id: userData._id || userData.id,
             role: userData.role,
             ...userData
           };
           localStorage.setItem("parampare_user", JSON.stringify(userToStore));
        } else {
           // Fallback if details fetch fails but login succeeded (rare)
           console.warn("Failed to fetch user details");
           localStorage.setItem("parampare_user", JSON.stringify({ email })); 
        }

        toast({
          title: "Login Successful!",
          description: "Welcome back to Parampare",
        });
        
        navigate("/");

      } catch (error: any) {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGetOTP = async () => {
    if (validateOtpLogin()) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/auth/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: phone,
            type: "login"
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send OTP");
        }

        toast({
          title: "OTP Sent",
          description: "Please check your mobile number.",
        });

        navigate("/verify-otp", { 
          state: { 
            identifier: phone.trim(), 
            isLogin: true,
            apiResponse: data,
            returnTo: returnTo 
          } 
        });

      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    else if (field === "password") setPassword(value);
    else if (field === "phone") setPhone(value.replace(/\D/g, "").slice(0, 10));
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const switchMode = (mode: LoginMode) => {
    setLoginMode(mode);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-xl overflow-hidden flex">
        {/* Left Side - Dark Maroon Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#3d2a2a] flex-col items-center justify-center p-8">
          <div className="text-center mb-6">
            <p className="text-cream/80 text-sm mb-1 font-body">Welcome to</p>
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

        {/* Right Side - Login Form */}
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
              {/* Login Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Login
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {loginMode === "password" ? "Sign in with your credentials" : "Sign in with OTP"}
                </p>
              </div>

              {loginMode === "password" ? (
                /* Password Login Form */
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
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
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`h-12 pl-10 ${errors.email ? "border-destructive" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="h-5 w-5" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`h-12 pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
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
                  </div>

                  <div className="flex justify-end">
                    <Link to="/forgot-password" className="text-sm text-gold hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button 
                    onClick={handlePasswordLogin}
                    className="w-full h-12 bg-maroon hover:bg-maroon-dark text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  {/* OR Separator */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative bg-card px-4">
                      <span className="text-sm text-muted-foreground">OR</span>
                    </div>
                  </div>

                  {/* OTP Alternative */}
                  <Button 
                    variant="outline"
                    onClick={() => switchMode("otp")}
                    className="w-full h-12 gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Login with OTP
                  </Button>
                </div>
              ) : (
                /* OTP Login Form */
                <div className="space-y-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground border-r border-border pr-2 mr-2">
                         <span className="text-lg">🇮🇳</span>
                         <span className="text-sm font-medium text-foreground">+91</span>
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className={`h-12 pl-24 ${errors.phone ? "border-destructive" : ""}`}
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone}</p>
                    )}

                  </div>

                  <Button 
                    onClick={handleGetOTP}
                    className="w-full h-12 bg-maroon hover:bg-maroon-dark text-white font-medium"
                    disabled={isLoading}
                  >
                     {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Get OTP"
                      )}
                  </Button>

                  {/* OR Separator */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative bg-card px-4">
                      <span className="text-sm text-muted-foreground">OR</span>
                    </div>
                  </div>

                  {/* Password Alternative */}
                  <Button 
                    variant="outline"
                    onClick={() => switchMode("password")}
                    className="w-full h-12 gap-2"
                  >
                    <Lock className="h-4 w-4" />
                    Login with Password
                  </Button>
                </div>
              )}

              {/* Helper Links */}
              <div className="flex justify-center text-sm mt-6">
                <Link to="/register" className="text-gold hover:underline font-medium">
                  New user? Register
                </Link>
              </div>

              {/* Terms */}
              <p className="text-xs text-center text-muted-foreground pt-4">
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
  );
};

export default Login;
