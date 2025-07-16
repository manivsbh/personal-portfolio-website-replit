import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import VoiceControls from "@/components/VoiceControls";
import VoiceIntroduction from "@/components/VoiceIntroduction";
import VoicePreview from "@/components/VoicePreview";

export default function Home() {
  useEffect(() => {
    document.title = "Manish Cheepa - Software Developer IV | Data Engineering & Cloud Specialist";
  }, []);

  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <VoiceControls />
      <VoiceIntroduction />
      <VoicePreview />
    </div>
  );
}
