import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Home as HomeIcon, Building } from "lucide-react";
import { toast } from "sonner";

const EstimateForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    floorplan: "",
    purpose: "",
    propertyType: "",
    propertyName: "",
    budget: "",
    possession: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = `*New Estimate Request*\n\nFloorplan: ${formData.floorplan}\nPurpose: ${formData.purpose}\nProperty Type: ${formData.propertyType}\nBudget: ${formData.budget}\nPossession: ${formData.possession}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
    
    const whatsappUrl = `https://wa.me/919175956905?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirecting to WhatsApp...");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <section id="estimate" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get Free Estimate</h2>
            <p className="text-xl text-muted-foreground">
              Tell us about your project and we'll get back to you with a detailed quote
            </p>
          </div>

          <Card className="border-border">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg mb-4 block">Your floorplan</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["1 BHK", "2 BHK", "3 BHK", "3+ BHK"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateFormData("floorplan", option)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.floorplan === option
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg mb-4 block">Purpose</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["Move In", "Rent Out", "Renovate"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateFormData("purpose", option)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              formData.purpose === option
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:border-primary"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!formData.floorplan || !formData.purpose}
                      className="w-full"
                      size="lg"
                    >
                      Next
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold mb-2">Basic Information</h3>
                      <p className="text-muted-foreground">Step 1 of 2</p>
                    </div>

                    <div>
                      <Label className="text-base mb-3 block">I own a...</Label>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { label: "Apartment", icon: Building2 },
                          { label: "Villa", icon: HomeIcon },
                          { label: "Independent Home", icon: Building },
                        ].map((option) => {
                          const Icon = option.icon;
                          return (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => updateFormData("propertyType", option.label)}
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                                formData.propertyType === option.label
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-primary"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget">I have a budget of...</Label>
                      <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="up-to-1.5L">Up to ₹1.5 Lakhs</SelectItem>
                          <SelectItem value="1.5L-3L">₹1.5 - 3 Lakhs</SelectItem>
                          <SelectItem value="3L-5L">₹3 - 5 Lakhs</SelectItem>
                          <SelectItem value="5L-10L">₹5 - 10 Lakhs</SelectItem>
                          <SelectItem value="10L+">₹10 Lakhs+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="possession">Possession in...</Label>
                      <Select value={formData.possession} onValueChange={(value) => updateFormData("possession", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Possession" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="1-month">Within 1 Month</SelectItem>
                          <SelectItem value="2-3-months">2-3 Months</SelectItem>
                          <SelectItem value="3-6-months">3-6 Months</SelectItem>
                          <SelectItem value="6-months+">6+ Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!formData.propertyType || !formData.budget || !formData.possession}
                        className="flex-1"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-semibold mb-2">Contact Details</h3>
                      <p className="text-muted-foreground">Step 2 of 2</p>
                    </div>

                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button type="submit" className="flex-1" size="lg">
                        Get Free Estimate
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EstimateForm;
