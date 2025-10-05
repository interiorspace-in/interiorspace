import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import EstimateForm from "@/components/EstimateForm";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div id="services"></div>
      <WhyUs />
      <EstimateForm />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
