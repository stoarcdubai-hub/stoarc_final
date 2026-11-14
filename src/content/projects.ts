export type Project = {
  slug: string;
  name: string;
  type: "Residential" | "Commercial" | "Hospitality" | "Interiors" | "Infrastructure" | "Healthcare";
  location: string;
  year: string;
  area: string;
  summary: string;
  cover: string;
  video: string; // leave "" if the project has no video
  gallery: string[];
  featured: boolean;
};

const img = (file: string) => `/images/projects/${file}`;

/** STOARC projects. featured: true = shows in the home page slider. */
export const projects: Project[] = [
  {
    slug: "h2o-group-of-companies",
    name: "H2O Group of Companies",
    type: "Commercial",
    location: "Dubai, UAE",
    year: "—",
    area: "—",
    summary:
      "A modern corporate office building with a strong presence — combining functional planning, a contemporary façade and efficient workspaces for a productive business environment.",
    cover: img("h2o-1.jpg"),
    video: "",
    gallery: [img("h2o-1.jpg")],
    featured: true,
  },
  {
    slug: "sora-cafe",
    name: "SORA Cafe",
    type: "Hospitality",
    location: "Al Ain, UAE",
    year: "—",
    area: "—",
    summary:
      "A modern café interior built around freshness, simplicity and brand identity — contemporary finishes, distinctive details and an inviting atmosphere.",
    cover: img("sora-1.jpg"),
    video: "",
    gallery: [img("sora-1.jpg"), img("sora-2.jpg")],
    featured: true,
  },
  {
    slug: "casa-sud-train-station",
    name: "Casa Sud Train Station",
    type: "Infrastructure",
    location: "China",
    year: "—",
    area: "—",
    summary:
      "A landmark railway station proposal — a future-oriented transport hub combining high-speed mobility, urban connectivity and public realm, with dynamic forms and efficient passenger circulation.",
    cover: img("casa-1.jpg"),
    video: "",
    gallery: [img("casa-2.jpg"), img("casa-3.png"), img("casa-4.png"), img("casa-1.jpg")],
    featured: true,
  },
  {
    slug: "t30-residence-unit",
    name: "T30 Residence Unit",
    type: "Residential",
    location: "Ajman, UAE",
    year: "—",
    area: "Approx. 125,000 sq.ft",
    summary:
      "A contemporary residential development for comfortable, efficient urban living — a modern façade, functional planning, integrated balconies and landscaped areas.",
    cover: img("t30-1.jpg"),
    video: "",
    gallery: [img("t30-1.jpg")],
    featured: true,
  },
  {
    slug: "novas",
    name: "Novas",
    type: "Healthcare",
    location: "Fujairah, UAE",
    year: "—",
    area: "—",
    summary:
      "A healthcare development designed as a modern, professional and comfortable medical destination — efficient planning, contemporary architecture and a refined façade.",
    cover: img("novas-1.jpg"),
    video: "",
    gallery: [img("novas-1.jpg"), img("novas-2.jpg")],
    featured: false,
  },
  {
    slug: "nexora-healthcare",
    name: "Nexora Healthcare",
    type: "Healthcare",
    location: "Fujairah, UAE",
    year: "—",
    area: "—",
    summary:
      "A contemporary healthcare facility planned for patient comfort and efficient operations — modern façade elements, functional layouts and a welcoming atmosphere.",
    cover: img("nexora-1.jpg"),
    video: "",
    gallery: [img("nexora-1.jpg"), img("nexora-2.jpg"), img("nexora-3.jpg")],
    featured: false,
  },
  {
    slug: "aurea-vista",
    name: "Aurea Vista",
    type: "Residential",
    location: "Dubai, UAE",
    year: "—",
    area: "—",
    summary:
      "A residential development pairing contemporary architecture with upscale living — landscaped areas, modern façades and carefully planned homes.",
    cover: img("aurea-1.jpg"),
    video: "",
    gallery: [img("aurea-1.jpg")],
    featured: false,
  },
  {
    slug: "autonova-motors",
    name: "Autonova Motors",
    type: "Commercial",
    location: "UAE",
    year: "—",
    area: "—",
    summary:
      "A modern car showroom exploring how a façade can express a brand — two parametric concepts with flowing vertical fins or modular 3D elements, paired with large glass walls.",
    cover: img("autonova-1.jpg"),
    video: "",
    gallery: [img("autonova-1.jpg")],
    featured: false,
  },
  {
    slug: "neighbourhood-cafe",
    name: "Neighbourhood Cafe",
    type: "Hospitality",
    location: "Sharjah, UAE",
    year: "—",
    area: "—",
    summary:
      "A warm, community-focused café that encourages social interaction — comfortable seating, natural materials and soft, layered lighting.",
    cover: img("neighbourhood-1.jpg"),
    video: "",
    gallery: [img("neighbourhood-1.jpg")],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);