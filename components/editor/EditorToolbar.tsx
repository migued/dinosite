'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import Button from '@/components/ui/Button';
import {
  FaEdit,
  FaEye,
  FaSave,
  FaDownload,
  FaUndo,
  FaRedo,
  FaDesktop,
  FaTabletAlt,
  FaMobileAlt
} from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function EditorToolbar() {
  const {
    site,
    isEditing,
    setIsEditing,
    viewport,
    setViewport,
    undo,
    redo,
    canUndo,
    canRedo,
    saveSite
  } = useEditorStore();

  const [showSaved, setShowSaved] = useState(false);

  const handleSave = () => {
    saveSite();
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (canRedo()) redo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canUndo, canRedo, undo, redo]);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">{site?.name || 'Untitled Site'}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {site?.published ? '🟢 Published' : '🟡 Draft'}
            </span>
            {showSaved && (
              <span className="text-xs text-green-600 font-medium">✓ Saved</span>
            )}
          </div>
        </div>

        {/* Center Section - Viewport Selector */}
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-2 rounded transition-colors ${
              viewport === 'desktop'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Desktop view"
          >
            <FaDesktop />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-2 rounded transition-colors ${
              viewport === 'tablet'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Tablet view"
          >
            <FaTabletAlt />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-2 rounded transition-colors ${
              viewport === 'mobile'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Mobile view"
          >
            <FaMobileAlt />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <div className="flex items-center space-x-1 border-r pr-2">
            <button
              onClick={undo}
              disabled={!canUndo()}
              className={`p-2 rounded transition-colors ${
                canUndo()
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Undo (Cmd/Ctrl + Z)"
            >
              <FaUndo />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo()}
              className={`p-2 rounded transition-colors ${
                canRedo()
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 cursor-not-allowed'
              }`}
              title="Redo (Cmd/Ctrl + Y)"
            >
              <FaRedo />
            </button>
          </div>

          {/* Main Actions */}
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
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}
