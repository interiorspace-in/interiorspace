import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const floorPlans = ["1 BHK", "2 BHK", "3 BHK", "3+ BHK"];

const purposes = ["Move In", "Rent Out", "Renovate"];

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
    floorPlan: "",
    purpose: "",
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
      floorPlan: "",
      purpose: "",
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

  const handleStep2Submit = () => {
    if (!formData.floorPlan) {
      toast.error("Please select your floor plan");
      return;
    }
    if (!formData.purpose) {
      toast.error("Please select the purpose");
      return;
    }
    setStep(3);
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
      const { error } = await supabase
        .from("estimate_leads")
        .insert({
          name: formData.name.trim(),
          phone: formData.phone,
          email: formData.email.trim().toLowerCase(),
          floor_plan: formData.floorPlan,
          purpose: formData.purpose,
          budget: formData.budget,
          possession: formData.possession,
          status: "new"
        });

      if (error) {
        console.error("Submission error:", error);
        toast.error("Failed to submit. Please try again.");
        return;
      }

      toast.success("Estimate request submitted successfully! We'll contact you soon.");
      handleClose();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Contact Details";
      case 2:
        return "Property Details";
      case 3:
        return "Budget & Timeline";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {getStepTitle()}
          </DialogTitle>
          <div className="flex justify-center gap-2 pt-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s < step
                    ? "bg-primary text-primary-foreground"
                    : s === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-sm pt-1">
            Step {step} of 3
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
              <Label htmlFor="floorPlan">Floor Plan *</Label>
              <Select
                value={formData.floorPlan}
                onValueChange={(value) => setFormData({ ...formData, floorPlan: value })}
              >
                <SelectTrigger id="floorPlan">
                  <SelectValue placeholder="Select floor plan" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {floorPlans.map((plan) => (
                    <SelectItem key={plan} value={plan}>
                      {plan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose *</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value) => setFormData({ ...formData, purpose: value })}
              >
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {purposes.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
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
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                className="flex-1"
                onClick={handleStep2Submit}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
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
                <SelectContent className="bg-background">
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
                <SelectContent className="bg-background">
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
                onClick={() => setStep(2)}
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
