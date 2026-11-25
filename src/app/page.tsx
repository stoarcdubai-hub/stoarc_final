import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import StructureSection from "@/components/StructureSection";
import About from "@/components/About";
import Pillars from "@/components/Pillars";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

// Business details for Google, built only from src/content/site.ts.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address[0],
    addressCountry: "AE",
  },
  sameAs: site.social.map((s) => s.href),
};

// Home page order: Video hero → About → Projects → 3D structure → Pillars → Footer (in layout)
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <ProjectsSection />
      <StructureSection />
      <Pillars />
    </>
  );
}