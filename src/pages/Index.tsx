import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import EstimateForm from "@/components/EstimateForm";
import Testimonials from "@/components/Testimonials";
import VideoTestimonials from "@/components/VideoTestimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="services"></div>
      <Services />
      <div id="why-us"></div>
      <WhyUs />
      <EstimateForm />
      <div id="testimonials"></div>
      <Testimonials />
      <div id="client-stories"></div>
      <VideoTestimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
