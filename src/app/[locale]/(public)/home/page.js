// src/app/home/page.js
import Hero from '@/components/Hero'; 
import About from '@/components/About'; 
import KeyPoints from '@/components/KeyPoints';
import CTA from '@/components/CTA';
import FAQ from '@/components/FAQ';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import Schedule from '@/components/Schedule';
import Gallery from '@/components/Gallery';
import MiniGallery from '@/components/MiniGallery';
import Stats from '@/components/Stats';

export default function HomePage() {
  return (
    <div>
      <Hero /> 
      <KeyPoints />
      <CTA />
      <About />
      <Schedule />
      <FAQ />
      <Contact />
      <Stats />
      <MiniGallery />
    </div>
  );
}
