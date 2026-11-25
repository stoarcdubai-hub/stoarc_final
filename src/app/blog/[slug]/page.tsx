import { notFound } from "next/navigation";

// /blog/[slug] — single post. Will load the post from Sanity by slug (not connected yet).
// Until then, every slug shows the 404 page.
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  void slug; // used for the Sanity query later

  notFound();
}
