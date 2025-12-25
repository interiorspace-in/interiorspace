import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featuredStories = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Whitefield",
    rating: 5,
    excerpt: "They transformed our empty apartment into a stunning home that perfectly reflects our personality.",
    project: "3BHK Full Home"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Koramangala",
    rating: 5,
    excerpt: "The modular kitchen they designed is not only beautiful but incredibly functional.",
    project: "Modular Kitchen"
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "HSR Layout",
    rating: 5,
    excerpt: "From consultation to installation, the process was seamless. Highly recommend their services!",
    project: "Master Bedroom"
  }
];

const ClientStoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Client Stories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from homeowners who trusted us to bring their vision to life.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {featuredStories.map((story) => (
            <article 
              key={story.id}
              className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(story.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                "{story.excerpt}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="font-semibold text-foreground text-sm">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.location}</p>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {story.project}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Link */}
        <div className="text-center">
          <Link 
            to="/testimonials"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Stories
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesSection;
