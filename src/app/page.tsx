import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import SystemArchitecture from "@/components/SystemArchitecture";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";
import EngineeringPhilosophy from "@/components/EngineeringPhilosophy";
import ContactSection from "@/components/ContactSection";
import TerminalWidget from "@/components/TerminalWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#FAF7F4] overflow-x-hidden pt-16">
      <Navbar />

      {/* 1. Hero */}
      <HeroSection />
      <TechStrip />

      {/* 2. Core Expertise */}
      <AboutSection />

      {/* 3. Technology Ecosystem */}
      <TechStack />

      {/* 4. Production AI Systems */}
      <Projects />

      {/* 5. Research & Publications */}
      <Research />

      {/* 6. Scalable Architecture */}
      <SystemArchitecture />

      {/* 7. Currently Building */}
      <CurrentlyBuilding />

      {/* 8. Certifications */}
      <Certifications />

      {/* 9. Engineering Philosophy */}
      <EngineeringPhilosophy />

      {/* 10. Contact */}
      <ContactSection />

      <TerminalWidget />

      <footer className="py-8 bg-[#F2EDE7] border-t border-[#E8E2DA] text-center text-slate-500 text-sm flex flex-col items-center gap-2">
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
