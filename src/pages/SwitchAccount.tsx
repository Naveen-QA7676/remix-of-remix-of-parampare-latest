import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TopUtilityHeader from "@/components/layout/TopUtilityHeader";
import MainHeader from "@/components/layout/MainHeader";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const SwitchAccount = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"phone" | "otp" | "success">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const handleGetOTP = () => {
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setStep("otp");
    toast({
      title: "OTP Sent",
      description: `OTP sent to +91 ${phone.slice(0, 2)}XXXXX${phone.slice(-3)}`,
    });
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    // Dummy validation: Accept "123456" as valid OTP for phone "1234567890"
    if (phone === "1234567890" && otpValue === "123456") {
      // Switch account
      const newUser = {
        fullName: "Test User",
        email: "testuser@parampare.com",
        phone: phone,
      };
      localStorage.setItem("parampare_user", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");
      setStep("success");
      toast({
        title: "Account Switched Successfully",
        description: "Welcome back!",
      });
    } else {
      setError("Invalid OTP. Use mobile: 1234567890 and OTP: 123456 for testing.");
    }
  };

  const handleContinue = () => {
    navigate("/");
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
          <span className="text-foreground">Switch Account</span>
        </nav>

        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-xl border border-border/50 shadow-soft p-8">
            {step === "phone" && (
              <>
                <h1 className="text-2xl font-display font-semibold text-foreground mb-2 text-center">
                  Switch Account
                </h1>
                <p className="text-muted-foreground text-sm text-center mb-6">
                  Enter your mobile number to switch to another account
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Mobile Number</label>
                    <div className="relative mt-1">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Phone className="h-5 w-5" />
                      </div>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                          setError("");
                        }}
                        placeholder="Enter 10-digit mobile number"
                        className={`pl-10 h-12 ${error ? "border-destructive" : ""}`}
                        maxLength={10}
                      />
                    </div>
                    {error && <p className="text-destructive text-sm mt-1">{error}</p>}
                  </div>

                  <Button
                    onClick={handleGetOTP}
                    className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground"
                  >
                    Get OTP
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    For testing, use mobile: <span className="font-medium">1234567890</span>
                  </p>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <button
                  onClick={() => setStep("phone")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Number
                </button>

                <h1 className="text-2xl font-display font-semibold text-foreground mb-2 text-center">
                  Verify OTP
                </h1>
                <p className="text-muted-foreground text-sm text-center mb-6">
                  Enter the 6-digit OTP sent to +91 {phone.slice(0, 2)}XXXXX{phone.slice(-3)}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                        className={`w-11 h-13 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold transition-all ${
                          error ? "border-destructive" : "border-border"
                        } bg-background`}
                      />
                    ))}
                  </div>
                  {error && <p className="text-destructive text-sm text-center">{error}</p>}

                  <Button
                    onClick={handleVerifyOTP}
                    className="w-full h-12 bg-gold hover:bg-gold/90 text-foreground"
                  >
                    Verify & Switch
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    For testing, use OTP: <span className="font-medium">123456</span>
                  </p>
                </div>
              </>
            )}

            {step === "success" && (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
                  Account Switched!
                </h1>
                <p className="text-muted-foreground mb-6">
                  You are now logged in as Test User
                </p>
                <Button
                  onClick={handleContinue}
                  className="bg-gold hover:bg-gold/90 text-foreground"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SwitchAccount;
