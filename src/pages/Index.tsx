import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlansSection from '@/components/PlansSection';
import MobilePlansSection from '@/components/MobilePlansSection';
import AboutSection from '@/components/AboutSection';
import CoverageSection from '@/components/CoverageSection';
import SpeedTestSection from '@/components/SpeedTestSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LocalSEOContent from '@/components/LocalSEOContent';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlansSection />
        <MobilePlansSection />
        <AboutSection />
        <CoverageSection />
        <SpeedTestSection />
        <TestimonialsSection />
        <ContactSection />
        <LocalSEOContent />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
