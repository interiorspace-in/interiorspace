import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

const budgetRanges = [
  "Up to 1.5 Lakhs",
  "1.5 - 3 Lakhs",
  "3 - 5 Lakhs",
  "5 - 10 Lakhs",
  "10 - 15 Lakhs",
  "15 - 20 Lakhs",
  "20 Lakhs+"
];

const possessionStatus = [
  "Immediate",
  "Within 1 Month",
  "2-3 Months",
  "3-6 Months",
  "6+ Months"
];

const MOCK_OTP = "123456";

interface EstimateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EstimateModal = ({ open, onOpenChange }: EstimateModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    budget: "",
    possession: ""
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: "",
      phone: "",
      email: "",
      budget: "",
      possession: ""
    });
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOtp = () => {
    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent to your phone number");
  };

  const handleVerifyOtp = () => {
    if (otp === MOCK_OTP) {
      setOtpVerified(true);
      toast.success("OTP verified successfully!");
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = () => {
    setOtp("");
    toast.success("OTP resent to your phone number");
  };

  const handleStep1Submit = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!otpVerified) {
      toast.error("Please verify your phone number with OTP");
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!formData.budget) {
      toast.error("Please select a budget range");
      return;
    }
    if (!formData.possession) {
      toast.error("Please select possession status");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/leads/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          budget: formData.budget,
          possession: formData.possession
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Estimate request submitted successfully!");
        handleClose();
      } else {
        toast.error(data.message || "Failed to submit estimate request");
      }
    } catch (error) {
      toast.error("Failed to connect to server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === 1 ? "Contact Details" : "Estimate Details"}
          </DialogTitle>
          <p className="text-center text-muted-foreground text-sm">
            Step {step} of 2
          </p>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="flex gap-2">
                <Input
                  id="phone"
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setFormData({ ...formData, phone: value });
                    if (otpSent) {
                      setOtpSent(false);
                      setOtpVerified(false);
                      setOtp("");
                    }
                  }}
                  maxLength={10}
                  required
                  disabled={otpVerified}
                />
                {!otpVerified && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendOtp}
                    disabled={!validatePhone(formData.phone)}
                    className="whitespace-nowrap"
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </Button>
                )}
              </div>
              {otpVerified && (
                <p className="text-sm text-green-600">✓ Phone verified</p>
              )}
            </div>

            {otpSent && !otpVerified && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <div className="flex gap-2">
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 6}
                  >
                    Verify
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-primary hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <Button
              className="w-full mt-6"
              onClick={handleStep1Submit}
              disabled={!otpVerified}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range *</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <SelectTrigger id="budget">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="possession">Possession Status *</Label>
              <Select
                value={formData.possession}
                onValueChange={(value) => setFormData({ ...formData, possession: value })}
              >
                <SelectTrigger id="possession">
                  <SelectValue placeholder="Select possession status" />
                </SelectTrigger>
                <SelectContent>
                  {possessionStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setStep(1)}
                disabled={isSubmitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EstimateModal;
