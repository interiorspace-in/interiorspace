import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import EstimateModal from "@/components/EstimateModal";
import { 
  trackWhatsAppClick, 
  generateWhatsAppMessage, 
  getWhatsAppUrl,
  getBookConsultationWhatsAppUrl
} from "@/hooks/useWhatsAppLeads";

interface TestimonialCTAProps {
  variant?: "overlay" | "inline" | "card";
  projectType?: string;
  clientName?: string;
  testimonialId?: string;
  pageSource?: string;
}

const TestimonialCTA = ({ 
  variant = "overlay", 
  projectType = "Interior Design",
  clientName = "Our Client",
  testimonialId,
  pageSource = "Home"
}: TestimonialCTAProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = async () => {
    // Generate message with client name and project type
    const message = generateWhatsAppMessage(clientName, projectType);
    const whatsappUrl = getWhatsAppUrl(message, pageSource, `testimonial_${projectType.toLowerCase().replace(/\s+/g, '_')}`);

    // Track lead asynchronously (non-blocking)
    trackWhatsAppClick({
      testimonial_id: testimonialId,
      client_name: clientName,
      project_type: projectType,
      page_source: pageSource,
    });

    // Open WhatsApp immediately (fail-safe: always opens even if tracking fails)
    window.open(whatsappUrl, "_blank");
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
            Chat on WhatsApp
          </Button>
        </div>
        <EstimateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </>
    );
  }

  if (variant === "card") {
    return (
      <>
        <div className="flex gap-2 w-full">
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Get Consultation
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-background/30 text-background hover:bg-background/10 text-xs font-medium"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            WhatsApp
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
