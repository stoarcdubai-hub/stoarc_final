/**
 * ALL MEDIA LINKS IN ONE PLACE
 * These are TEMPORARY placeholders from free stock libraries:
 *   - Videos: Mixkit (free license, https://mixkit.co/license/)
 *   - Photos: Picsum (random free photos, https://picsum.photos)
 *
 * To switch to STOARC's own media later:
 *   1. Put your files in /public/videos and /public/images
 *   2. Replace each URL below with the local path, e.g. "/videos/hero.mp4"
 */

const mixkit = (id: number, quality: 360 | 720 | 1080 = 360) =>
  `https://assets.mixkit.co/videos/${id}/${id}-${quality}.mp4`;

const photo = (seed: string, w = 1600, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const media = {
    hero: {
    video: mixkit(8631), // background: holiday house in a field, aerial view
    poster: photo("stoarc-hero", 1920, 1080),
    insetVideo: mixkit(29514), // middle window: house alone on a hill
    insetPoster: photo("stoarc-hero-inset", 1200, 750),
  },
  about: {
    video: mixkit(23975), // Architects working on a house model
    photo: photo("stoarc-studio", 1200, 1500),
  },
  projects: {
    p1: { video: mixkit(27503), cover: photo("stoarc-p1") }, // Villas along the beach
    p2: { video: mixkit(29514), cover: photo("stoarc-p2") }, // House alone on a hill
    p3: { video: mixkit(20949), cover: photo("stoarc-p3") }, // Houses on a coastal cliff
    p4: { video: mixkit(8633), cover: photo("stoarc-p4") }, // Holiday house between fields
    p5: { video: mixkit(27090), cover: photo("stoarc-p5") }, // Houses by the river
    p6: { video: mixkit(7383), cover: photo("stoarc-p6") }, // Architecture houses
  },
  gallery: (projectSeed: string, count = 4) =>
    Array.from({ length: count }, (_, i) => photo(`${projectSeed}-g${i + 1}`, 1600, 1100)),
  /** 3D model for the Structure section. null = built-in placeholder building. */
  model3d: null as string | null, // later: "/models/stoarc-building.glb"
};