import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import EstimateModal from "@/components/EstimateModal";

interface TestimonialCTAProps {
  variant?: "overlay" | "inline";
  projectType?: string;
}

const TestimonialCTA = ({ variant = "overlay", projectType }: TestimonialCTAProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const message = projectType 
      ? `Hi! I saw your ${projectType} testimonial and I'm interested in a similar design for my home.`
      : "Hi! I saw your client testimonials and I'm interested in interior design services.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919999999999?text=${encodedMessage}`, "_blank");
  };

  if (variant === "overlay") {
    return (
      <>
        <div className="flex flex-col gap-2 w-full">
          <Button
            size="sm"
            className="w-full bg-primary/90 hover:bg-primary text-primary-foreground text-xs font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Get Free Design Consultation
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full border-background/30 bg-background/10 text-background hover:bg-background/20 text-xs font-medium"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            View Similar Project
          </Button>
        </div>
        <EstimateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </>
    );
  }

  return (
    <>
      <div className="flex gap-3">
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => setIsModalOpen(true)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Get Free Consultation
        </Button>
        <Button
          variant="outline"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
      </div>
      <EstimateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default TestimonialCTA;
