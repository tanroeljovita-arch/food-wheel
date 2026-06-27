import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Food Wheel",
    short_name: "Food Wheel",
    description:
      "Food Wheel helps you randomly pick restaurants or food options near you using manual entries and real Google Places results.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff4e8",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
