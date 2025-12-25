import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoTestimonials from "@/components/VideoTestimonials";

const VideoTestimonialsPage = () => {
  return (
    <>
      <Helmet>
        <title>Client Stories & Video Testimonials | Interior Space</title>
        <meta
          name="description"
          content="Watch real video testimonials from our satisfied clients. Discover their transformation journey with Interior Space's premium interior design services."
        />
        <meta
          name="keywords"
          content="interior design testimonials, client reviews, video testimonials, home renovation reviews, interior transformation stories"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-24 pb-8 bg-foreground">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-background mb-4">
                Client <span className="text-primary">Stories</span>
              </h1>
              <p className="text-background/70 max-w-2xl mx-auto text-lg">
                Real stories from real clients. Watch how we transformed their spaces and exceeded their expectations.
              </p>
            </div>
          </section>

          {/* Video Testimonials */}
          <VideoTestimonials isFullPage />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default VideoTestimonialsPage;
