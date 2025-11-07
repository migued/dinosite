export const generateSitePrompt = (name: string, description: string, industry: string) => `
You are an expert web designer. Generate a complete one-page website structure in JSON format based on the following information:

Website Name: ${name}
Description: ${description}
Industry: ${industry}

Create a website with the following blocks in this exact JSON structure:

{
  "blocks": [
    {
      "id": "unique-id-1",
      "type": "hero",
      "order": 0,
      "data": {
        "title": "Compelling main headline",
        "subtitle": "Supporting subtitle",
        "ctaText": "Call to action button text",
        "ctaLink": "#contact"
      }
    },
    {
      "id": "unique-id-2",
      "type": "features",
      "order": 1,
      "data": {
        "title": "Features section title",
        "subtitle": "Features subtitle",
        "features": [
          {
            "icon": "⚡",
            "title": "Feature 1",
            "description": "Description"
          },
          {
            "icon": "🚀",
            "title": "Feature 2",
            "description": "Description"
          },
          {
            "icon": "💎",
            "title": "Feature 3",
            "description": "Description"
          }
        ]
      }
    },
    {
      "id": "unique-id-3",
      "type": "testimonials",
      "order": 2,
      "data": {
        "title": "What Our Customers Say",
        "testimonials": [
          {
            "name": "Customer Name",
            "role": "Job Title, Company",
            "content": "Testimonial quote"
          },
          {
            "name": "Customer Name 2",
            "role": "Job Title, Company",
            "content": "Testimonial quote"
          },
          {
            "name": "Customer Name 3",
            "role": "Job Title, Company",
            "content": "Testimonial quote"
          }
        ]
      }
    },
    {
      "id": "unique-id-4",
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
      "id": "unique-id-5",
      "type": "footer",
      "order": 4,
      "data": {
        "companyName": "${name}",
        "tagline": "Short tagline",
        "socialLinks": [
          {
            "platform": "facebook",
            "url": "https://facebook.com"
          },
          {
            "platform": "twitter",
            "url": "https://twitter.com"
          },
          {
            "platform": "instagram",
            "url": "https://instagram.com"
          }
        ],
        "copyright": "© 2024 ${name}. All rights reserved."
      }
    }
  ],
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
