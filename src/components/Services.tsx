import { Card, CardContent } from "@/components/ui/card";
import bedroomImg from "@/assets/bedroom.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import livingRoomImg from "@/assets/living-room.jpg";
import officeImg from "@/assets/office.jpg";
import wardrobeImg from "@/assets/wardrobe.jpg";
const services = [{
  title: "Full Home Interiors",
  image: livingRoomImg,
  description: "Complete interior solutions for your entire home"
}, {
  title: "Modular Kitchens",
  image: kitchenImg,
  description: "Modern and functional kitchen designs"
}, {
  title: "Living Rooms",
  image: livingRoomImg,
  description: "Elegant and comfortable living spaces"
}, {
  title: "Bedrooms",
  image: bedroomImg,
  description: "Peaceful and personalized bedroom designs"
}, {
  title: "Wardrobes",
  image: wardrobeImg,
  description: "Custom storage solutions for your needs"
}, {
  title: "Sofa and Dinning",
  image: livingRoomImg,
  description: "Stylish furniture for dining and relaxation"
}, {
  title: "Entrance and Foyer",
  image: livingRoomImg,
  description: "Make a lasting first impression"
}, {
  title: "Office Spaces",
  image: officeImg,
  description: "Productive and inspiring work environments"
}];
const Services = () => {
  return <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 py-[10px]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services Offered</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your space with our comprehensive interior design solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Services;