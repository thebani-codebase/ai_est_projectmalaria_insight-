import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ModelHeroSection from "@/components/ModelHeroSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import DatasetSection from "@/components/DatasetSection";
import MalariaStagesSection from "@/components/MalariaStagesSection";
import PatchDemoSection from "@/components/PatchDemoSection";
import ResultsSection from "@/components/ResultsSection";
import GradCAMSection from "@/components/GradCAMSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import Chatbot from "@/components/Chatbot";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ModelHeroSection />
    <ArchitectureSection />
    <DatasetSection />
    <MalariaStagesSection />
    <PatchDemoSection />
    <ResultsSection />
    <GradCAMSection />
    <HowItWorks />
    <FeaturesSection />
    <Chatbot />
  </div>
);

export default Index;
