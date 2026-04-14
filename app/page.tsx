import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ScrollProgress, BackToTop } from '@/components/ScrollUtils';
import { SplashScreen } from '@/components/SplashScreen';

// Memuat komponen secara dinamis (Lazy Load) yang tidak terlihat saat layar pertama kali dibuka (Below the fold)
const FeaturedDishes = dynamic(() => import('@/components/FeaturedDishes').then(mod => mod.FeaturedDishes), { ssr: true });
const SpiceSection = dynamic(() => import('@/components/SpiceSection').then(mod => mod.SpiceSection), { ssr: true });
const RegionalGrid = dynamic(() => import('@/components/RegionalGrid').then(mod => mod.RegionalGrid), { ssr: true });
const StatsSection = dynamic(() => import('@/components/StatsSection').then(mod => mod.StatsSection), { ssr: true });
const QuoteSection = dynamic(() => import('@/components/QuoteSection').then(mod => mod.QuoteSection), { ssr: true });
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer), { ssr: true });

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
