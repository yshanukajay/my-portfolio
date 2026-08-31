import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";
import BlogSection from "@/components/BlogSection";
import EngineeringPhilosophy from "@/components/EngineeringPhilosophy";
import ContactSection from "@/components/ContactSection";
import TerminalWidget from "@/components/TerminalWidget";
import LazySection from "@/components/LazySection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F4F8FC] overflow-x-hidden pt-16">
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />
      <TechStrip />

      {/* 2. Core Expertise */}
      <AboutSection />

      {/* 3. Technology Ecosystem */}
      <TechStack />

      {/* 4. Production AI Systems */}
      <LazySection id="projects" height="600px">
        <Projects />
      </LazySection>

      {/* 5. Research & Publications */}
      <LazySection id="publications" height="500px">
        <Research />
      </LazySection>

      {/* 6. Blog Posts */}
      <LazySection id="blogs" height="500px">
        <BlogSection />
      </LazySection>

      {/* 7. Currently Building */}
      <LazySection height="400px">
        <CurrentlyBuilding />
      </LazySection>

      {/* 8. Certifications */}
      <LazySection height="300px">
        <Certifications />
      </LazySection>

      {/* 9. Engineering Philosophy */}
      <LazySection height="400px">
        <EngineeringPhilosophy />
      </LazySection>

      {/* 10. Contact */}
      <LazySection id="contact" height="500px">
        <ContactSection />
      </LazySection>

      <TerminalWidget />

      <footer className="py-8 bg-[#F1F5F9] border-t border-[#E2E8F0] text-center text-slate-500 text-sm flex flex-col items-center gap-2">
        <p>&copy; {new Date().getFullYear()} Yohan Shanuka — Engineering intelligent systems.</p>
        <div className="flex items-center gap-4 mt-1">
          <a href="https://github.com/yshanukajay" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors font-medium">GitHub</a>
          <span className="text-slate-300">|</span>
          <a href="https://www.linkedin.com/in/yohanshanukajay/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors font-medium">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}
