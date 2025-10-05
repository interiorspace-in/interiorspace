import { Clock, Shield, Award, Users } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "45-Day Delivery",
    description: "Fast-track your dream home with our guaranteed quick delivery timeline",
  },
  {
    icon: Shield,
    title: "10-Year Warranty",
    description: "Peace of mind with our comprehensive long-term warranty coverage",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Only the finest materials and craftsmanship in every project",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced designers and skilled craftsmen dedicated to excellence",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with Interior Space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-10 w-10 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
