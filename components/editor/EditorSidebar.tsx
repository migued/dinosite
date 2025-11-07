'use client';

import { useEditorStore } from '@/lib/store/editorStore';

export default function EditorSidebar() {
  const { site, selectedBlockId, setSelectedBlock } = useEditorStore();

  if (!site) return null;

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Blocks</h2>

        <div className="space-y-2">
          {site.blocks
            .sort((a, b) => a.order - b.order)
            .map((block) => (
              <div
                key={block.id}
                onClick={() => setSelectedBlock(block.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedBlockId === block.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {block.type}
                    </p>
                    <p className="text-xs text-gray-500">Order: {block.order}</p>
                  </div>
                  <span className="text-2xl">
                    {block.type === 'hero' && '🎯'}
                    {block.type === 'features' && '⭐'}
                    {block.type === 'contact' && '📧'}
                    {block.type === 'testimonials' && '💬'}
                    {block.type === 'footer' && '📍'}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Theme</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Primary Color</span>
              <div
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: site.theme.primaryColor }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Secondary Color</span>
              <div
                className="w-8 h-8 rounded border border-gray-300"
                style={{ backgroundColor: site.theme.secondaryColor }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
