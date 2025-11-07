import { Site } from '@/types/site';

/**
 * Migrates a legacy single-page site to the new multi-page structure
 */
export const migrateLegacySite = (site: Site): Site => {
  // Already migrated if it has pages
  if (site.pages && site.pages.length > 0) {
    return site;
  }

  // Migrate blocks to a single home page
  const blocks = site.blocks || [];
  const now = new Date().toISOString();

  const homePage = {
    id: crypto.randomUUID(),
    slug: '',
    title: 'Home',
    blocks,
    seo: site.seo || {
      title: site.name,
      description: `${site.name} - Home`,
    },
    isHome: true,
    created_at: site.created_at || now,
    updated_at: now,
  };

  // Create migrated site
  const migratedSite: Site = {
    ...site,
    pages: [homePage],
    currentPageId: homePage.id,
    blocks: undefined, // Remove legacy blocks property
    seo: site.seo || {
      title: site.name,
      description: `Welcome to ${site.name}`,
    },
    updated_at: now,
  };

  return migratedSite;
};

/**
 * Ensures a site has the new structure, migrating if necessary
 */
export const ensureSiteStructure = (site: Site): Site => {
  let migratedSite = migrateLegacySite(site);

  // Ensure SEO exists
  if (!migratedSite.seo) {
    migratedSite.seo = {
      title: migratedSite.name,
      description: `Welcome to ${migratedSite.name}`,
    };
  }

  // Ensure pages have SEO
  if (migratedSite.pages) {
    migratedSite.pages = migratedSite.pages.map(page => ({
      ...page,
      seo: page.seo || {
        title: page.title,
        description: `${page.title} - ${migratedSite.name}`,
      },
    }));
  }

  // Set default currentPageId if missing
  if (migratedSite.pages && migratedSite.pages.length > 0 && !migratedSite.currentPageId) {
    const homePage = migratedSite.pages.find(p => p.isHome) || migratedSite.pages[0];
    migratedSite.currentPageId = homePage.id;
  }

  return migratedSite;
};
