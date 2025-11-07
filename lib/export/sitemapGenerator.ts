import { Site } from '@/types/site';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

/**
 * Generates XML sitemap for a site
 */
export const generateSitemap = (site: Site, baseUrl: string): string => {
  const urls: SitemapURL[] = [];

  // Add pages to sitemap
  if (site.pages && site.pages.length > 0) {
    site.pages.forEach(page => {
      const url: SitemapURL = {
        loc: `${baseUrl}/${page.slug}`,
        lastmod: page.updated_at,
        changefreq: page.isHome ? 'weekly' : 'monthly',
        priority: page.isHome ? 1.0 : 0.8,
      };
      urls.push(url);
    });
  }

  // Add blog posts to sitemap
  if (site.blog?.enabled && site.blog.posts) {
    site.blog.posts
      .filter(post => post.published)
      .forEach(post => {
        const url: SitemapURL = {
          loc: `${baseUrl}/blog/${post.slug}`,
          lastmod: post.updated_at,
          changefreq: 'monthly',
          priority: 0.6,
        };
        urls.push(url);
      });
  }

  // Generate XML
  const urlsXml = urls
    .map(
      url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
};

/**
 * Generates robots.txt content
 */
export const generateRobotsTxt = (baseUrl: string): string => {
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
};
