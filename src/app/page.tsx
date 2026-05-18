import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStrip from "@/components/TechStrip";
import AboutSection from "@/components/AboutSection";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import MLOpsPipelines from "@/components/MLOpsPipelines";
import SystemArchitecture from "@/components/SystemArchitecture";
import AdditionalSections from "@/components/AdditionalSections";
import ContactSection from "@/components/ContactSection";
import TerminalWidget from "@/components/TerminalWidget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 overflow-x-hidden pt-16">
      <Navbar />
      <HeroSection />
      <TechStrip />
      <AboutSection />
      <TechStack />
      <MLOpsPipelines />
      <SystemArchitecture />
      <Projects />
      <Certifications />
      <AdditionalSections />
      <ContactSection />
      <TerminalWidget />
      
      <footer className="py-8 bg-white border-t border-slate-100 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Yohan Shanuka. Designed for scalable ML.</p>
      </footer>
    </main>
  );
}
