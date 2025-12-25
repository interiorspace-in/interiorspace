import { Helmet } from "react-helmet-async";
import { Star, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const clientStories = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Whitefield, Bangalore",
    project: "3BHK Full Home Interior",
    rating: 5,
    story: "Working with this team was an absolute pleasure. They transformed our empty apartment into a stunning home that perfectly reflects our personality. The attention to detail and quality of work exceeded our expectations.",
    highlight: "Completed in just 45 days"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Koramangala, Bangalore",
    project: "Modular Kitchen & Living Room",
    rating: 5,
    story: "The modular kitchen they designed is not only beautiful but incredibly functional. Every inch of space has been utilized smartly. Our guests always compliment our home now!",
    highlight: "Space optimization expert"
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "HSR Layout, Bangalore",
    project: "Master Bedroom & Wardrobe",
    rating: 5,
    story: "From the initial consultation to the final installation, the process was seamless. The wardrobe design maximizes storage while looking elegant. Highly recommend their services!",
    highlight: "Premium materials used"
  },
  {
    id: 4,
    name: "Vikram Reddy",
    location: "Indiranagar, Bangalore",
    project: "Office Space Design",
    rating: 5,
    story: "They understood our brand identity and created an office space that motivates our team every day. The ergonomic design and aesthetic appeal are perfectly balanced.",
    highlight: "Brand-aligned design"
  },
  {
    id: 5,
    name: "Meera Iyer",
    location: "JP Nagar, Bangalore",
    project: "Complete Villa Interior",
    rating: 5,
    story: "Our villa transformation was nothing short of magical. Each room tells a unique story while maintaining a cohesive design language throughout. True craftsmanship!",
    highlight: "Luxury finish quality"
  },
  {
    id: 6,
    name: "Arjun Mehta",
    location: "Electronic City, Bangalore",
    project: "2BHK Compact Design",
    rating: 5,
    story: "Despite having a compact 2BHK, they made it feel spacious and luxurious. The smart storage solutions and minimal design approach worked wonders for our space.",
    highlight: "Smart space solutions"
  }
];

const ClientStories = () => {
  return (
    <>
      <Helmet>
        <title>Client Stories | Interior Design Success Stories & Testimonials</title>
        <meta 
          name="description" 
          content="Read inspiring stories from our satisfied clients. Discover how we transformed their homes and offices with premium interior design solutions in Bangalore." 
        />
        <meta 
          name="keywords" 
          content="interior design testimonials, client reviews, home transformation stories, Bangalore interior design reviews" 
        />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase bg-primary/10 text-primary rounded-full">
              Testimonials
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Client Stories
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real experiences from homeowners who trusted us to transform their spaces into dream interiors.
            </p>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {clientStories.map((story) => (
                <article 
                  key={story.id}
                  className="group bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-primary/20" />
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "{story.story}"
                  </p>

                  <div className="pt-6 border-t border-border/50">
                    <h3 className="font-semibold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground">{story.location}</p>
                    <p className="text-sm text-primary font-medium mt-1">{story.project}</p>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {story.highlight}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Create Your Story?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join hundreds of happy homeowners who transformed their spaces with us.
            </p>
            <a 
              href="/get-estimate"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Get Free Estimate
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ClientStories;
