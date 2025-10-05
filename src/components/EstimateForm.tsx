import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Home as HomeIcon, Building, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
const EstimateForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [formData, setFormData] = useState({
    floorplan: "",
    purpose: "",
    propertyType: "",
    budget: "",
    possession: "",
    name: "",
    email: "",
    phone: ""
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
    setFormData({
      ...formData,
      [field]: value
    });
  };
  if (showReview) {
    return <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-12 opacity-90">
              Get a free estimate or book a consultation with our expert designers today
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button onClick={handleConfirm} size="lg" variant="secondary" className="text-lg px-8">
                Get Free Estimate →
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white/10" asChild>
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
                  <a href="https://maps.app.goo.gl/6aekHNxkd2sgDLnq8" target="_blank" rel="noopener noreferrer" className="underline opacity-90 hover:opacity-100">
                    Ravet, Pune 412101
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone / WhatsApp</h3>
                  <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer" className="underline opacity-90 hover:opacity-100">
                    +91 91759 56905
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:info@interiorspace.com" className="underline opacity-90 hover:opacity-100">
                    info@interiorspace.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>;
  }
  return;
};
export default EstimateForm;