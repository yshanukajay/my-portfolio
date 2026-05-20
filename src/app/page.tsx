import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import MLOpsPipelines from "@/components/MLOpsPipelines";
import SystemArchitecture from "@/components/SystemArchitecture";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";
import EngineeringPhilosophy from "@/components/EngineeringPhilosophy";
import ContactSection from "@/components/ContactSection";
import TerminalWidget from "@/components/TerminalWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden pt-16">
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

      {/* 5. MLOps & Data Pipelines */}
      <MLOpsPipelines />

      {/* 6. Scalable Architecture */}
      <SystemArchitecture />

      {/* 7. Currently Building */}
      <CurrentlyBuilding />

      {/* 8. Certifications */}
      <Certifications />

      {/* 9. Research & Publications */}
      <Research />

      {/* 10. Engineering Philosophy */}
      <EngineeringPhilosophy />

      {/* 10. Contact */}
      <ContactSection />

      <TerminalWidget />

      <footer className="py-8 bg-white border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Yohan Shanuka — Engineering intelligent systems.</p>
      </footer>
    </main>
  );
}
