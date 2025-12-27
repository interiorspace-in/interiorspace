import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoTestimonials from "@/components/VideoTestimonials";
import MobileStickyTestimonialCTA from "@/components/MobileStickyTestimonialCTA";
import TestimonialSchemaMarkup from "@/components/TestimonialSchemaMarkup";
import { useVideoTestimonials, useTestimonialBySlug } from "@/hooks/useVideoTestimonials";

const VideoTestimonialsPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { data: testimonials } = useVideoTestimonials();
  const { data: singleTestimonial } = useTestimonialBySlug(slug || "");

  // Dynamic meta content for SEO
  const pageTitle = singleTestimonial
    ? `${singleTestimonial.project_type} Interior Design Review – ${singleTestimonial.client_name} | Interior Space`
    : "Client Stories & Video Testimonials | Interior Space";
  
  const pageDescription = singleTestimonial
    ? `${singleTestimonial.testimonial_text} - Watch ${singleTestimonial.client_name}'s ${singleTestimonial.project_type} interior design transformation.`
    : "Watch real video testimonials from our satisfied clients. Discover their transformation journey with Interior Space's premium interior design services.";

  const pageKeywords = singleTestimonial
    ? `${singleTestimonial.project_type} interior design, ${singleTestimonial.client_name} review, interior design testimonial, ${singleTestimonial.location || ""} interior designer`
    : "interior design testimonials, client reviews, video testimonials, home renovation reviews, interior transformation stories";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={`https://interiorspace.in/testimonials${slug ? `/${slug}` : ""}`} />
      </Helmet>

      {/* Schema Markup for SEO */}
      {testimonials && (
        <TestimonialSchemaMarkup 
          testimonials={testimonials} 
          singleTestimonial={singleTestimonial}
        />
      )}

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pb-16 md:pb-0">
          {/* Hero Section */}
          <section className="pt-24 pb-8 bg-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-background mb-4">
                Client <span className="text-primary">Stories</span>
              </h1>
              <p className="text-background/70 max-w-2xl mx-auto text-lg">
                Real stories from real clients. Watch how we transformed their spaces and exceeded their expectations.
              </p>
              {testimonials && testimonials.length > 0 && (
                <div className="mt-4 flex items-center justify-center gap-2 text-background/60 text-sm">
                  <span className="font-semibold text-primary">{testimonials.length}+</span>
                  <span>Happy Clients Sharing Their Experience</span>
                </div>
              )}
            </div>
          </section>

          {/* Video Testimonials */}
          <VideoTestimonials isFullPage showTrustBadges />
        </main>

        <Footer />

        {/* Mobile Sticky CTA */}
        <MobileStickyTestimonialCTA />
      </div>
    </>
  );
};

export default VideoTestimonialsPage;
