import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import EstimateModal from "@/components/EstimateModal";

const MobileStickyTestimonialCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background border-t border-border p-3 shadow-lg">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
            onClick={() => setIsModalOpen(true)}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Talk to Our Designer
          </Button>
        </div>
      </div>
      <EstimateModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default MobileStickyTestimonialCTA;
