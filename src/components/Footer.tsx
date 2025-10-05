import { MapPin, Phone, Facebook, Instagram, MessageCircle } from "lucide-react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Interior <span className="text-primary">Space</span>
            </h3>
            <p className="text-background/80 mb-4">
              Transforming homes in Pune and Pimpri Chinchwad with premium interior design solutions.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-background/80">
              <li>Careers</li>
              <li>Disclaimer</li>
              <li>Living Rooms</li>
              <li>Bedrooms</li>
              <li>Wardrobes</li>
              <li>Office Spaces</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <a href="https://maps.app.goo.gl/6aekHNxkd2sgDLnq8" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Ravet, Pune 412101
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="https://wa.me/919175956905" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +91 91759 56905
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; {currentYear} Interior Space. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;