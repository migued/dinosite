'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useEditorStore } from '@/lib/store/editorStore';
import Editor from '@/components/editor/Editor';

export default function EditorPage() {
  const params = useParams();
  const { setSite } = useEditorStore();

  useEffect(() => {
    // Load site from localStorage
    const siteId = params.id as string;
    const siteData = localStorage.getItem(`site_${siteId}`);

    if (siteData) {
      const site = JSON.parse(siteData);
      setSite(site);
    }
  }, [params.id, setSite]);

  return <Editor />;
}
