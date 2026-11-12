"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/content/projects";

/** Photo by default; plays the project's video on hover (desktop). */
export default function ProjectCard({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="reveal group block"
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-line">
        <Image
          src={project.cover}
          alt={`${project.name}, ${project.type} project in ${project.location}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
        />
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-semibold md:text-2xl">{project.name}</h3>
        <span className="text-sm text-earth">{project.year}</span>
      </div>
      <p className="mt-1 text-sm text-earth">
        {project.type} · {project.location}
      </p>
    </Link>
  );
}