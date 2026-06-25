import type { MetadataRoute } from "next";

const siteUrl = "https://food-wheel-seven.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/about`,
    },
    {
      url: `${siteUrl}/privacy`,
    },
    {
      url: `${siteUrl}/contact`,
    },
  ];
}
