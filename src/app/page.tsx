import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveGrowthSection from "@/components/LiveGrowthSection";
import SocialFeedSection from "@/components/SocialFeedSection";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import FinalCTASection from "@/components/FinalCTASection";
import ContactSection from "@/components/ContactSection";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <LiveGrowthSection />
      <ServicesSection />
      <SocialFeedSection />
      <WhySection />
      <FinalCTASection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
