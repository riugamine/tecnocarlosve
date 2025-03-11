import Hero from '@/app/sections/Hero';
import Services from '@/app/sections/Services';
import Projects from '@/app/sections/Projects';
import Coverage from '@/app/sections/Coverage';
import Contact from '@/app/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Projects />
      <Coverage />
      <Contact />
    </main>
  );
}