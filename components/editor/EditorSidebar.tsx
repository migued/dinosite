'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { useState } from 'react';
import { FaCube, FaPalette, FaTrash } from 'react-icons/fa';

export default function EditorSidebar() {
  const { site, selectedBlockId, setSelectedBlock, updateTheme, removeBlock } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'blocks' | 'theme'>('blocks');

  if (!site) return null;

  const blockIcons: Record<string, string> = {
    navbar: '🧭',
    hero: '🎯',
    features: '⭐',
    stats: '📊',
    cta: '🚀',
    pricing: '💰',
    gallery: '🖼️',
    testimonials: '💬',
    contact: '📧',
    footer: '📍',
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('blocks')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'blocks'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaCube className="inline mr-2" />
          Blocks
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'theme'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaPalette className="inline mr-2" />
          Theme
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'blocks' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Page Blocks ({site.blocks.length})
              </h2>
              <p className="text-xs text-gray-500">
                Click to select, drag to reorder
              </p>
            </div>

            <div className="space-y-2">
              {site.blocks
                .sort((a, b) => a.order - b.order)
                .map((block, index) => (
                  <div
                    key={block.id}
                    onClick={() => setSelectedBlock(block.id)}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                      selectedBlockId === block.id
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{blockIcons[block.type]}</span>
                        <div>
                          <p className="font-medium text-gray-900 capitalize text-sm">
                            {block.type}
                          </p>
                          <p className="text-xs text-gray-500">Position {index + 1}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete ${block.type} block?`)) {
                            removeBlock(block.id);
                          }
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                        title="Delete block"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Add Block Button (for future) */}
            <button className="w-full mt-4 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors text-sm">
              + Add Block (Coming Soon)
            </button>
          </div>
        )}

        {activeTab === 'theme' && (
          <div>
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Color Palette
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Customize your site colors
              </p>

              <div className="space-y-4">
                {/* Primary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={site.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={site.theme.primaryColor}
                      onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={site.theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={site.theme.secondaryColor}
                      onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={site.theme.accentColor}
                      onChange={(e) => updateTheme({ accentColor: e.target.value })}
                      className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={site.theme.accentColor}
                      onChange={(e) => updateTheme({ accentColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={site.theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={site.theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={site.theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="w-12 h-12 rounded cursor-pointer border-2 border-gray-300"
                    />
                    <input
                      type="text"
                      value={site.theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() =>
                      updateTheme({
                        primaryColor: '#3B82F6',
                        secondaryColor: '#1E40AF',
                        accentColor: '#60A5FA',
                      })
                    }
                    className="h-10 rounded bg-gradient-to-r from-blue-500 to-blue-700 hover:shadow-lg transition-shadow"
                    title="Blue"
                  />
                  <button
                    onClick={() =>
                      updateTheme({
                        primaryColor: '#10B981',
                        secondaryColor: '#047857',
                        accentColor: '#34D399',
                      })
                    }
                    className="h-10 rounded bg-gradient-to-r from-green-500 to-green-700 hover:shadow-lg transition-shadow"
                    title="Green"
                  />
                  <button
                    onClick={() =>
                      updateTheme({
                        primaryColor: '#8B5CF6',
                        secondaryColor: '#6D28D9',
                        accentColor: '#A78BFA',
                      })
                    }
                    className="h-10 rounded bg-gradient-to-r from-purple-500 to-purple-700 hover:shadow-lg transition-shadow"
                    title="Purple"
                  />
                  <button
                    onClick={() =>
                      updateTheme({
                        primaryColor: '#EF4444',
                        secondaryColor: '#B91C1C',
                        accentColor: '#F87171',
                      })
                    }
                    className="h-10 rounded bg-gradient-to-r from-red-500 to-red-700 hover:shadow-lg transition-shadow"
                    title="Red"
                  />
                  <button
                    onClick={() =>
                      updateTheme({
                        primaryColor: '#F59E0B',
                        secondaryColor: '#D97706',
                        accentColor: '#FBBF24',
                      })
                    }
                    className="h-10 rounded bg-gradient-to-r from-amber-500 to-amber-700 hover:shadow-lg transition-shadow"
                    title="Amber"
                  />
                  <button
                    onClick={() =>
                      updateTheme({
                        primaryColor: '#1F2937',
                        secondaryColor: '#111827',
                        accentColor: '#4B5563',
                      })
                    }
                    className="h-10 rounded bg-gradient-to-r from-gray-800 to-gray-900 hover:shadow-lg transition-shadow"
                    title="Dark"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
