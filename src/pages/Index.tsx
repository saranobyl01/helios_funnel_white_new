import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProcessSection />
        <PricingSection />
        <TrustSection />
        {/* <StatsSection /> */}
      </main>
      {/* <TestimonialsSection /> */}
      <Footer />
    </div>
  );
};

export default Index;
