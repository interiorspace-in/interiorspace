import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Home as HomeIcon, Building, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";

const EstimateForm = () => {
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState({
    floorplan: "",
    purpose: "",
    propertyType: "",
    budget: "",
    possession: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowReview(true);
  };

  const handleConfirm = () => {
    // Format message for WhatsApp
    const message = `*New Estimate Request*\n\nFloorplan: ${formData.floorplan}\nPurpose: ${formData.purpose}\nProperty Type: ${formData.propertyType}\nBudget: ${formData.budget}\nPossession: ${formData.possession}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}`;
    
    const whatsappUrl = `https://wa.me/919175956905?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    
    toast.success("Redirecting to WhatsApp...");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (showReview) {
    return (
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-12 opacity-90">
              Get a free estimate or book a consultation with our expert designers today
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                onClick={handleConfirm}
                size="lg"
                variant="secondary"
                className="text-lg px-8"
              >
                Get Free Estimate →
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10"
                asChild
              >
                <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer">
                  Book Consultation
                </a>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <a 
                    href="https://maps.app.goo.gl/6aekHNxkd2sgDLnq8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline opacity-90 hover:opacity-100"
                  >
                    Ravet, Pune 412101
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                  <a 
                    href="https://wa.me/919175956905" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline opacity-90 hover:opacity-100"
                  >
                    +91 91759 56905
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:info@interiorspace.com"
                    className="underline opacity-90 hover:opacity-100"
                  >
                    info@interiorspace.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="estimate" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Floorplan Section */}
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

                  {/* Purpose Section */}
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

                  {/* Property Type Section */}
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

                  {/* Budget Section */}
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

                  {/* Possession Section */}
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

                  {/* Contact Details Section */}
                  <div className="border-t pt-8">
                    <h3 className="text-xl font-semibold mb-6">Contact Details</h3>
                    
                    <div className="space-y-4">
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
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Next
                  </Button>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default EstimateForm;
