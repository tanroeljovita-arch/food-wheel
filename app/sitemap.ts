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
    {
      url: `${siteUrl}/random-restaurant-picker`,
    },
    {
      url: `${siteUrl}/what-to-eat-near-me`,
    },
    {
      url: `${siteUrl}/food-wheel-malaysia`,
    },
    {
      url: `${siteUrl}/makan-wheel-malaysia`,
    },
    {
      url: `${siteUrl}/guides`,
    },
    {
      url: `${siteUrl}/guides/how-to-pick-what-to-eat`,
    },
    {
      url: `${siteUrl}/guides/random-restaurant-picker-guide`,
    },
    {
      url: `${siteUrl}/guides/what-to-eat-when-you-cannot-decide`,
    },
    {
      url: `${siteUrl}/guides/malaysia-food-decision-guide`,
    },
    {
      url: `${siteUrl}/guides/how-food-wheel-uses-location-search`,
    },
    {
      url: `${siteUrl}/guides/group-food-decision-tips`,
    },
  ];
}
