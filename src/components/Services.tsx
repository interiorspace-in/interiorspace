import { Card, CardContent } from "@/components/ui/card";
import { Home, ChefHat, Bed, Armchair, DoorOpen, Briefcase, ShoppingBag } from "lucide-react";
import kitchenImg from "@/assets/kitchen.jpg";
import bedroomImg from "@/assets/bedroom.jpg";
import livingRoomImg from "@/assets/living-room.jpg";
import officeImg from "@/assets/office.jpg";
import wardrobeImg from "@/assets/wardrobe.jpg";

const services = [
  {
    title: "Full Home Interiors",
    description: "Complete home transformation with customized designs",
    icon: Home,
    image: livingRoomImg,
  },
  {
    title: "Modular Kitchens",
    description: "Smart, stylish, and functional kitchen solutions",
    icon: ChefHat,
    image: kitchenImg,
  },
  {
    title: "Living Rooms",
    description: "Elegant spaces for relaxation and entertainment",
    icon: Armchair,
    image: livingRoomImg,
  },
  {
    title: "Bedrooms",
    description: "Cozy and comfortable personal sanctuaries",
    icon: Bed,
    image: bedroomImg,
  },
  {
    title: "Wardrobes",
    description: "Organized storage solutions with style",
    icon: ShoppingBag,
    image: wardrobeImg,
  },
  {
    title: "Office Spaces",
    description: "Productive and inspiring work environments",
    icon: Briefcase,
    image: officeImg,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From modular kitchens to complete home makeovers, we bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
