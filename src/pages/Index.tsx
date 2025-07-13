import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlansSection from '@/components/PlansSection';
import MobilePlansSection from '@/components/MobilePlansSection';
import AboutSection from '@/components/AboutSection';
import CoverageSection from '@/components/CoverageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PlansSection />
      <MobilePlansSection />
      <AboutSection />
      <CoverageSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
