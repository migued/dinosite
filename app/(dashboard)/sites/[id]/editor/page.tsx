'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useEditorStore } from '@/lib/store/editorStore';
import Editor from '@/components/editor/Editor';
import { ensureSiteStructure } from '@/lib/migrations/siteMigrations';

export default function EditorPage() {
  const params = useParams();
  const { setSite } = useEditorStore();

  useEffect(() => {
    // Load site from localStorage
    const siteId = params.id as string;
    const siteData = localStorage.getItem(`site_${siteId}`);

    if (siteData) {
      const site = JSON.parse(siteData);

      // Migrate legacy sites to new multi-page structure
      const migratedSite = ensureSiteStructure(site);

      // Save migrated site back to localStorage
      if (migratedSite !== site) {
        localStorage.setItem(`site_${siteId}`, JSON.stringify(migratedSite));
      }

      setSite(migratedSite);
    }
  }, [params.id, setSite]);

  return <Editor />;
}
