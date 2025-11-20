import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PlansSection from '@/components/PlansSection';
import MobilePlansSection from '@/components/MobilePlansSection';
import AboutSection from '@/components/AboutSection';
import CoverageSection from '@/components/CoverageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LocalSEOContent from '@/components/LocalSEOContent';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PlansSection />
        <MobilePlansSection />
        <AboutSection />
        <CoverageSection />
        <TestimonialsSection />
        <ContactSection />
        <LocalSEOContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
