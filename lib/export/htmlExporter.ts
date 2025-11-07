import { Site } from '@/types/site';
import { Block } from '@/types/blocks';

const renderHeroBlock = (block: any) => `
  <section class="hero" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 5rem 1rem; background-color: #f3f4f6;">
    <div style="max-width: 56rem; margin: 0 auto; text-align: center;">
      <h1 style="font-size: 3.75rem; font-weight: bold; margin-bottom: 1.5rem; color: #111827;">${block.data.title}</h1>
      <p style="font-size: 1.5rem; margin-bottom: 2rem; color: #4b5563;">${block.data.subtitle}</p>
      <a href="${block.data.ctaLink}" style="display: inline-block; padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border-radius: 0.5rem; text-decoration: none; font-weight: 500;">${block.data.ctaText}</a>
    </div>
  </section>
`;

const renderFeaturesBlock = (block: any) => {
  const featuresHtml = block.data.features
    .map(
      (feature: any) => `
    <div style="text-align: center;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">${feature.icon}</div>
      <h3 style="font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">${feature.title}</h3>
      <p style="color: #4b5563;">${feature.description}</p>
    </div>
  `
    )
    .join('');

  return `
  <section class="features" style="padding: 5rem 1rem; background-color: white;">
    <div style="max-width: 72rem; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h2 style="font-size: 2.25rem; font-weight: bold; color: #111827; margin-bottom: 1rem;">${block.data.title}</h2>
        <p style="font-size: 1.25rem; color: #4b5563;">${block.data.subtitle}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        ${featuresHtml}
      </div>
    </div>
  </section>
`;
};

const renderContactBlock = (block: any) => `
  <section class="contact" style="padding: 5rem 1rem; background-color: #f9fafb;">
    <div style="max-width: 56rem; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 3rem;">
        <h2 style="font-size: 2.25rem; font-weight: bold; color: #111827; margin-bottom: 1rem;">${block.data.title}</h2>
        <p style="font-size: 1.25rem; color: #4b5563;">${block.data.subtitle}</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
        <div>
          <div style="margin-bottom: 1rem;">
            <h3 style="font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Email</h3>
            <p style="color: #4b5563;">${block.data.email}</p>
          </div>
          ${
            block.data.phone
              ? `
          <div style="margin-bottom: 1rem;">
            <h3 style="font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Phone</h3>
            <p style="color: #4b5563;">${block.data.phone}</p>
          </div>
          `
              : ''
          }
          ${
            block.data.address
              ? `
          <div>
            <h3 style="font-weight: 600; color: #111827; margin-bottom: 0.5rem;">Address</h3>
            <p style="color: #4b5563;">${block.data.address}</p>
          </div>
          `
              : ''
          }
        </div>
        <form style="display: flex; flex-direction: column; gap: 1rem;">
          <input type="text" placeholder="Name" style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;" />
          <input type="email" placeholder="Email" style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;" />
          <textarea placeholder="Message" rows="5" style="padding: 0.5rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;"></textarea>
          <button type="submit" style="padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">Send Message</button>
        </form>
      </div>
    </div>
  </section>
`;

const renderTestimonialsBlock = (block: any) => {
  const testimonialsHtml = block.data.testimonials
    .map(
      (testimonial: any) => `
    <div style="background-color: #f9fafb; padding: 1.5rem; border-radius: 0.5rem;">
      <p style="color: #374151; margin-bottom: 1rem; font-style: italic;">"${testimonial.content}"</p>
      <div>
        <p style="font-weight: 600; color: #111827;">${testimonial.name}</p>
        <p style="font-size: 0.875rem; color: #4b5563;">${testimonial.role}</p>
      </div>
    </div>
  `
    )
    .join('');

  return `
  <section class="testimonials" style="padding: 5rem 1rem; background-color: white;">
    <div style="max-width: 72rem; margin: 0 auto;">
      <h2 style="font-size: 2.25rem; font-weight: bold; color: #111827; text-align: center; margin-bottom: 4rem;">${block.data.title}</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        ${testimonialsHtml}
      </div>
    </div>
  </section>
`;
};

const renderFooterBlock = (block: any) => {
  const socialLinksHtml = block.data.socialLinks
    .map(
      (link: any) => `
    <a href="${link.url}" target="_blank" style="color: #9ca3af; text-decoration: none;">
      ${link.platform}
    </a>
  `
    )
    .join(' | ');

  return `
  <footer style="background-color: #111827; color: white; padding: 3rem 1rem;">
    <div style="max-width: 72rem; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">${block.data.companyName}</h3>
        <p style="color: #9ca3af;">${block.data.tagline}</p>
      </div>
      <div style="text-align: center; margin-bottom: 2rem;">
        ${socialLinksHtml}
      </div>
      <div style="text-align: center; color: #9ca3af; font-size: 0.875rem;">
        <p>${block.data.copyright}</p>
      </div>
    </div>
  </footer>
`;
};

const renderBlock = (block: Block): string => {
  switch (block.type) {
    case 'hero':
      return renderHeroBlock(block);
    case 'features':
      return renderFeaturesBlock(block);
    case 'contact':
      return renderContactBlock(block);
    case 'testimonials':
      return renderTestimonialsBlock(block);
    case 'footer':
      return renderFooterBlock(block);
    default:
      return '';
  }
};

export const exportToHTML = (site: Site): string => {
  const blocksHtml = site.blocks
    .sort((a, b) => a.order - b.order)
    .map(renderBlock)
    .join('\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${site.name}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: ${site.theme.fontFamily};
      line-height: 1.6;
    }
  </style>
</head>
<body>
  ${blocksHtml}
</body>
</html>
  `.trim();
};
