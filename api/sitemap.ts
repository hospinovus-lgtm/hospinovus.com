import type { VercelRequest, VercelResponse } from "@vercel/node"
import { servicesData } from "../src/data/servicesData"

export default function handler(req: VercelRequest, res: VercelResponse) {
  const protocol = req.headers["x-forwarded-proto"] || "https"
  const host = req.headers.host

  const baseUrl = `${protocol}://${host}`

  const staticPages = ["", "/about", "/services", "/contact"]

  const staticUrls = staticPages.map((page) => `
    <url>
      <loc>${baseUrl}${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>
  `)

  const serviceUrls = servicesData.map((service) => `
    <url>
      <loc>${baseUrl}/services/${service.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${[...staticUrls, ...serviceUrls].join("")}
  </urlset>`

  res.setHeader("Content-Type", "text/xml")
  res.status(200).send(sitemap)
}