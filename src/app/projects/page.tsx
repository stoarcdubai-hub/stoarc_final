import type { Metadata } from "next";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Projects" };

/** /projects: all projects */
export default function ProjectsPage() {
  return (
    <section className="bg-sand pt-32">
      <div className="mx-auto max-w-[1440px] px-6 pb-32 md:px-10">
        <p className="text-xs tracking-[0.2em] text-earth">PROJECTS</p>
        <h1 className="font-display mt-3 mb-16 text-5xl font-semibold md:text-7xl">All work</h1>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}