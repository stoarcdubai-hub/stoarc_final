import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import StructureSection from "@/components/StructureSection";
import About from "@/components/About";
import Pillars from "@/components/Pillars";


// Home page order: Video hero → Projects → 3D structure → About → Footer (in layout)
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <StructureSection />
      <About />
        <Pillars />

    </>
  );
}