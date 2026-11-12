import { media } from "./media";

export type Project = {
  slug: string;
  name: string;
  type: "Residential" | "Commercial" | "Hospitality" | "Interiors";
  location: string;
  year: string;
  area: string;
  summary: string;
  cover: string;
  video: string;
  gallery: string[];
  featured: boolean;
};

/**
 * PLACEHOLDER PROJECTS: replace names, details and text with STOARC's real work.
 * featured: true = shows on the home page.
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    name: "[Project One]",
    type: "Residential",
    location: "[Location]",
    year: "[Year]",
    area: "[000 m²]",
    summary: "[Short description of the project: the brief, the site and the main design idea.]",
    cover: media.projects.p1.cover,
    video: media.projects.p1.video,
    gallery: media.gallery("stoarc-p1"),
    featured: true,
  },
  {
    slug: "project-two",
    name: "[Project Two]",
    type: "Commercial",
    location: "[Location]",
    year: "[Year]",
    area: "[000 m²]",
    summary: "[Short description of the project.]",
    cover: media.projects.p2.cover,
    video: media.projects.p2.video,
    gallery: media.gallery("stoarc-p2"),
    featured: true,
  },
  {
    slug: "project-three",
    name: "[Project Three]",
    type: "Hospitality",
    location: "[Location]",
    year: "[Year]",
    area: "[000 m²]",
    summary: "[Short description of the project.]",
    cover: media.projects.p3.cover,
    video: media.projects.p3.video,
    gallery: media.gallery("stoarc-p3"),
    featured: true,
  },
  {
    slug: "project-four",
    name: "[Project Four]",
    type: "Residential",
    location: "[Location]",
    year: "[Year]",
    area: "[000 m²]",
    summary: "[Short description of the project.]",
    cover: media.projects.p4.cover,
    video: media.projects.p4.video,
    gallery: media.gallery("stoarc-p4"),
    featured: true,
  },
  {
    slug: "project-five",
    name: "[Project Five]",
    type: "Interiors",
    location: "[Location]",
    year: "[Year]",
    area: "[000 m²]",
    summary: "[Short description of the project.]",
    cover: media.projects.p5.cover,
    video: media.projects.p5.video,
    gallery: media.gallery("stoarc-p5"),
    featured: false,
  },
  {
    slug: "project-six",
    name: "[Project Six]",
    type: "Commercial",
    location: "[Location]",
    year: "[Year]",
    area: "[000 m²]",
    summary: "[Short description of the project.]",
    cover: media.projects.p6.cover,
    video: media.projects.p6.video,
    gallery: media.gallery("stoarc-p6"),
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);