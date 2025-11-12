'use client';

import { useEffect } from 'react';

interface GoogleFontsLoaderProps {
  fontFamily: string;
}

/**
 * Dynamically loads Google Fonts
 */
export default function GoogleFontsLoader({ fontFamily }: GoogleFontsLoaderProps) {
  useEffect(() => {
    // Skip if default system fonts
    if (fontFamily === 'system-ui' || fontFamily === 'Inter') {
      return;
    }

    // Check if font is already loaded
    const existingLink = document.getElementById('google-fonts-link');

    // Format font name for Google Fonts URL
    const fontName = fontFamily.replace(/\s+/g, '+');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700;800;900&display=swap`;

    if (existingLink) {
      existingLink.setAttribute('href', fontUrl);
    } else {
      const link = document.createElement('link');
      link.id = 'google-fonts-link';
      link.rel = 'stylesheet';
      link.href = fontUrl;
      document.head.appendChild(link);
    }

    return () => {
      // Optionally clean up
    };
  }, [fontFamily]);

  return null;
}
