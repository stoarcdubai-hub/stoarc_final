import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.name ?? "Project" };
}

/** /projects/[slug]: one project */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="bg-sand">
      {/* Top: video if available, otherwise the cover photo */}
      <div className="relative h-[85svh] min-h-[480px] overflow-hidden bg-ink">
        {project.video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={project.video}
            poster={project.cover}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
        ) : (
          <Image
            src={project.cover}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-ink/30" aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-14 text-white md:px-10">
          <p className="text-xs tracking-[0.2em]">{project.type.toUpperCase()}</p>
          <h1 className="font-display mt-3 text-5xl font-semibold md:text-8xl">{project.name}</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-24 md:grid-cols-3 md:px-10">
        <dl className="grid grid-cols-2 gap-6 text-sm md:grid-cols-1">
          <div><dt className="text-earth">Location</dt><dd className="mt-1">{project.location}</dd></div>
          <div><dt className="text-earth">Year</dt><dd className="mt-1">{project.year}</dd></div>
          <div><dt className="text-earth">Type</dt><dd className="mt-1">{project.type}</dd></div>
          <div><dt className="text-earth">Area</dt><dd className="mt-1">{project.area}</dd></div>
        </dl>
        <p className="text-xl leading-relaxed md:col-span-2 md:text-2xl">{project.summary}</p>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-6 px-6 pb-24 md:grid-cols-2 md:px-10">
        {project.gallery.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`reveal relative overflow-hidden rounded-md bg-line ${
              i % 3 === 0 ? "aspect-[16/9] md:col-span-2" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={src}
              alt={`${project.name}, image ${i + 1}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-white">
        <Link
          href={`/projects/${next.slug}`}
          className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-16 md:px-10"
        >
          <span className="text-sm text-earth">Next project</span>
          <span className="font-display text-3xl font-semibold md:text-5xl">{next.name} →</span>
        </Link>
      </div>
    </article>
  );
}