export const generateSitePrompt = (name: string, description: string, industry: string) => `
You are an expert web designer. Generate a complete multi-page website structure in JSON format based on the following information:

Website Name: ${name}
Description: ${description}
Industry: ${industry}

Create a website with a home page and the following structure in this exact JSON format:

{
  "pages": [
    {
      "id": "home-page-id",
      "slug": "",
      "title": "Home",
      "isHome": true,
      "seo": {
        "title": "${name} - Industry-specific tagline",
        "description": "Compelling meta description for SEO",
        "keywords": ["keyword1", "keyword2", "keyword3"]
      },
      "blocks": [
        {
          "id": "hero-id",
          "type": "hero",
          "order": 0,
          "data": {
            "title": "Compelling main headline",
            "subtitle": "Supporting subtitle",
            "ctaText": "Call to action",
            "ctaLink": "#contact"
          }
        },
        {
          "id": "features-id",
          "type": "features",
          "order": 1,
          "data": {
            "title": "Features title",
            "subtitle": "Features subtitle",
            "features": [
              {"icon": "⚡", "title": "Feature 1", "description": "Description"},
              {"icon": "🚀", "title": "Feature 2", "description": "Description"},
              {"icon": "💎", "title": "Feature 3", "description": "Description"}
            ]
          }
        },
        {
          "id": "testimonials-id",
          "type": "testimonials",
          "order": 2,
          "data": {
            "title": "What Our Customers Say",
            "testimonials": [
              {"name": "Name 1", "role": "Job, Company", "content": "Quote"},
              {"name": "Name 2", "role": "Job, Company", "content": "Quote"},
              {"name": "Name 3", "role": "Job, Company", "content": "Quote"}
            ]
          }
        },
        {
          "id": "contact-id",
          "type": "contact",
          "order": 3,
          "data": {
            "title": "Get In Touch",
            "subtitle": "Contact subtitle",
            "email": "contact@example.com",
            "phone": "+1 (555) 123-4567",
            "address": "123 Main St, City, State 12345"
          }
        },
        {
          "id": "footer-id",
          "type": "footer",
          "order": 4,
          "data": {
            "companyName": "${name}",
            "tagline": "Short tagline",
            "socialLinks": [
              {"platform": "facebook", "url": "https://facebook.com"},
              {"platform": "twitter", "url": "https://twitter.com"},
              {"platform": "instagram", "url": "https://instagram.com"}
            ],
            "copyright": "© 2024 ${name}. All rights reserved."
          }
        }
      ]
    }
  ],
  "seo": {
    "title": "${name}",
    "description": "${description}",
    "keywords": ["${industry}"]
  },
  "theme": {
    "primaryColor": "#3B82F6",
    "secondaryColor": "#1E40AF",
    "accentColor": "#60A5FA",
    "backgroundColor": "#FFFFFF",
    "textColor": "#1F2937",
    "fontFamily": "Inter, sans-serif"
  }
}

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown formatting or code blocks
2. Make content specific to the ${industry} industry
3. Use appropriate emojis for feature icons that match the industry
4. Create compelling, professional copy
5. Each block must have a unique id (use crypto.randomUUID() format)
6. Keep testimonials realistic and industry-specific
7. Use appropriate contact information placeholders
8. Choose a color scheme that fits the industry

Return only the JSON object, nothing else.
`;
