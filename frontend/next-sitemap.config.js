/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  generateRobotsTxt: false, // robots.ts route handles robots.txt
  generateIndexSitemap: false,
  exclude: ["/404"],
  outDir: "public",
};
