import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GetEstimate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    floorplan: "",
    purpose: "",
    propertyType: "",
    propertyName: "",
    address: {
      lane1: "",
      lane2: "",
      city: "",
      landmark: ""
    },
    budget: "",
    possession: "",
    name: "",
    email: "",
    phone: "",
    whatsappUpdates: false
  });

  const updateFormData = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const updateAddress = (field: string, value: string) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value
      }
    });
  };

  const handleNext = () => {
    if (step === 1 && (!formData.floorplan || !formData.purpose)) {
      toast.error("Please select floorplan and purpose");
      return;
    }
    if (step === 2 && (!formData.propertyType || !formData.budget || !formData.possession)) {
      toast.error("Please complete all fields");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all contact details");
      return;
    }

    const addressString = formData.propertyType === "Apartment" 
      ? formData.propertyName
      : `${formData.address.lane1}, ${formData.address.lane2}, ${formData.address.city}, ${formData.address.landmark}`;

    const message = `*New Estimate Request*\n\nFloorplan: ${formData.floorplan}\nPurpose: ${formData.purpose}\nProperty Type: ${formData.propertyType}\nProperty/Address: ${addressString}\nBudget: ${formData.budget}\nPossession: ${formData.possession}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nWhatsApp Updates: ${formData.whatsappUpdates ? "Yes" : "No"}`;
    
    const whatsappUrl = `https://wa.me/919175956905?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    toast.success("Redirecting to WhatsApp...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Free Estimate</h1>
                <p className="text-lg text-muted-foreground">Tell us about your project and we'll get back to you with a detailed quote</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your floorplan</h2>
                  <RadioGroup value={formData.floorplan} onValueChange={(value) => updateFormData("floorplan", value)}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((option) => (
                        <Label
                          key={option}
                          htmlFor={option}
                          className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.floorplan === option
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={option} id={option} className="sr-only" />
                          <span className="font-medium">{option}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Purpose</h2>
                  <RadioGroup value={formData.purpose} onValueChange={(value) => updateFormData("purpose", value)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Move In", "Rent Out", "Renovate"].map((option) => (
                        <Label
                          key={option}
                          htmlFor={option}
                          className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.purpose === option
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={option} id={option} className="sr-only" />
                          <span className="font-medium">{option}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end pt-4">
                  <Button size="lg" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {formData.purpose && formData.floorplan ? `${formData.purpose.replace("Move In", "Moving in my")} ${formData.floorplan} property` : "Basic Information"}
                </h1>
                <p className="text-muted-foreground">STEP 1 of 2</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-lg font-semibold mb-3 block">I own a...</Label>
                  <RadioGroup value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
                    <div className="space-y-3">
                      {["Apartment", "Villa", "Independent Home"].map((option) => (
                        <Label
                          key={option}
                          htmlFor={`property-${option}`}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.propertyType === option
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <RadioGroupItem value={option} id={`property-${option}`} className="mr-3" />
                          <span className="font-medium">{option}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {formData.propertyType === "Apartment" && (
                  <div>
                    <Label htmlFor="propertyName" className="text-lg font-semibold">My property is called...</Label>
                    <Input
                      id="propertyName"
                      placeholder="e.g., Silver Wisteria Division"
                      value={formData.propertyName}
                      onChange={(e) => updateFormData("propertyName", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                )}

                {(formData.propertyType === "Villa" || formData.propertyType === "Independent Home") && (
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Address</Label>
                    <Input
                      placeholder="Lane 1"
                      value={formData.address.lane1}
                      onChange={(e) => updateAddress("lane1", e.target.value)}
                    />
                    <Input
                      placeholder="Lane 2"
                      value={formData.address.lane2}
                      onChange={(e) => updateAddress("lane2", e.target.value)}
                    />
                    <Input
                      placeholder="City"
                      value={formData.address.city}
                      onChange={(e) => updateAddress("city", e.target.value)}
                    />
                    <Input
                      placeholder="Landmark"
                      value={formData.address.landmark}
                      onChange={(e) => updateAddress("landmark", e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="budget" className="text-lg font-semibold">I have a budget of...</Label>
                  <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                    <SelectTrigger id="budget" className="mt-2">
                      <SelectValue placeholder="Select Budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Up to 1.5 Lakhs">Up to 1.5 Lakhs</SelectItem>
                      <SelectItem value="1.5 - 3 Lakhs">1.5 - 3 Lakhs</SelectItem>
                      <SelectItem value="3 - 5 Lakhs">3 - 5 Lakhs</SelectItem>
                      <SelectItem value="5 - 10 Lakhs">5 - 10 Lakhs</SelectItem>
                      <SelectItem value="10 - 15 Lakhs">10 - 15 Lakhs</SelectItem>
                      <SelectItem value="15 - 20 Lakhs">15 - 20 Lakhs</SelectItem>
                      <SelectItem value="20 Lakhs+">20 Lakhs+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="possession" className="text-lg font-semibold">Possession in...</Label>
                  <Select value={formData.possession} onValueChange={(value) => updateFormData("possession", value)}>
                    <SelectTrigger id="possession" className="mt-2">
                      <SelectValue placeholder="Select Possession" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="Within 1 Month">Within 1 Month</SelectItem>
                      <SelectItem value="2-3 Months">2-3 Months</SelectItem>
                      <SelectItem value="3-6 Months">3-6 Months</SelectItem>
                      <SelectItem value="6+ Months">6+ Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button size="lg" onClick={handleNext}>
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Get Free Consultant</h1>
                <p className="text-muted-foreground">STEP 2 of 2</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email ID</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="mt-2"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whatsapp"
                    checked={formData.whatsappUpdates}
                    onCheckedChange={(checked) => updateFormData("whatsappUpdates", checked)}
                  />
                  <Label htmlFor="whatsapp" className="cursor-pointer">
                    Send me updates on WhatsApp
                  </Label>
                </div>

                <p className="text-sm text-muted-foreground">
                  By submitting this form, you agree to the privacy policy & terms and conditions
                </p>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" size="lg" onClick={() => setStep(2)}>
                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                  </Button>
                  <Button type="submit" size="lg">
                    Get Free Quote
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetEstimate;
