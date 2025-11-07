'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import Button from '@/components/ui/Button';
import { FaEdit, FaEye, FaSave, FaDownload } from 'react-icons/fa';

export default function EditorToolbar() {
  const { site, isEditing, setIsEditing } = useEditorStore();

  const handleSave = async () => {
    // TODO: Implement save to database
    console.log('Saving site...', site);
    alert('Site saved! (Database integration pending)');
  };

  const handleExport = async () => {
    if (!site) return;

    try {
      const response = await fetch('/api/sites/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(site),
      });

      if (!response.ok) throw new Error('Export failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${site.name || 'site'}.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export site');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-gray-900">{site?.name || 'Untitled Site'}</h1>
        <span className="text-sm text-gray-500">
          {site?.published ? '🟢 Published' : '🟡 Draft'}
        </span>
      </div>

      <div className="flex items-center space-x-3">
        <Button
          variant={isEditing ? 'primary' : 'outline'}
          onClick={() => setIsEditing(!isEditing)}
          size="sm"
        >
          {isEditing ? <FaEye className="mr-2" /> : <FaEdit className="mr-2" />}
          {isEditing ? 'Preview' : 'Edit'}
        </Button>

        <Button variant="secondary" onClick={handleSave} size="sm">
          <FaSave className="mr-2" />
          Save
        </Button>

        <Button variant="outline" onClick={handleExport} size="sm">
          <FaDownload className="mr-2" />
          Export HTML
        </Button>
      </div>
    </div>
  );
}
