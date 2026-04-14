import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedDishes } from '@/components/FeaturedDishes';
import { SpiceSection } from '@/components/SpiceSection';
import { RegionalGrid } from '@/components/RegionalGrid';
import { StatsSection } from '@/components/StatsSection';
import { QuoteSection } from '@/components/QuoteSection';
import { Footer } from '@/components/Footer';
import { ScrollProgress, BackToTop } from '@/components/ScrollUtils';
import { SplashScreen } from '@/components/SplashScreen';

export default function Home() {
  return (
    <main className="min-h-screen grain-overlay">
      <SplashScreen />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <FeaturedDishes />
      <div className="section-divider" />
      <StatsSection />
      <div className="section-divider" />
      <SpiceSection />
      <QuoteSection />
      <div className="section-divider" />
      <RegionalGrid />
      <div className="section-divider" />
      <Footer />
      <BackToTop />
    </main>
  );
}
