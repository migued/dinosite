'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { useState } from 'react';
import { FaCube, FaPalette, FaPlus, FaTrash, FaFileAlt, FaBlog, FaHome } from 'react-icons/fa';
import { BlockType } from '@/types/blocks';
import { blockTemplates, blockDescriptions } from '@/lib/blockTemplates';

export default function EditorSidebar() {
  const {
    site,
    selectedBlockId,
    setSelectedBlock,
    updateTheme,
    removeBlock,
    addBlock,
    getCurrentBlocks,
    addPage,
    removePage,
    setCurrentPage,
    enableBlog,
    addBlogPost,
    removeBlogPost,
  } = useEditorStore();
  const [activeTab, setActiveTab] = useState<'blocks' | 'add' | 'pages' | 'blog' | 'theme'>('blocks');
  const currentBlocks = getCurrentBlocks();

  if (!site) return null;

  const blockIcons: Record<string, string> = {
    navbar: '🧭',
    hero: '🎯',
    features: '⭐',
    stats: '📊',
    cta: '🚀',
    pricing: '💰',
    gallery: '🖼️',
    team: '👥',
    faq: '❓',
    video: '🎥',
    newsletter: '📬',
    logoGrid: '🏢',
    testimonials: '💬',
    contact: '📧',
    footer: '📍',
    blogList: '📝',
    blogPost: '📄',
    blogCategories: '🏷️',
  };

  const handleAddBlock = (blockType: BlockType) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type: blockType,
      order: currentBlocks.length,
      data: blockTemplates[blockType],
    };
    addBlock(newBlock as any);
  };

  const availableBlocks: BlockType[] = [
    'navbar',
    'hero',
    'features',
    'stats',
    'cta',
    'pricing',
    'gallery',
    'team',
    'faq',
    'video',
    'newsletter',
    'logoGrid',
    'testimonials',
    'contact',
    'footer',
    'blogList',
    'blogPost',
    'blogCategories',
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="grid grid-cols-3 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('blocks')}
          className={`px-2 py-3 text-xs font-medium transition-colors ${
            activeTab === 'blocks'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaCube className="inline mr-1" />
          Blocks
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-2 py-3 text-xs font-medium transition-colors ${
            activeTab === 'add'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaPlus className="inline mr-1" />
          Add
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-2 py-3 text-xs font-medium transition-colors ${
            activeTab === 'pages'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaFileAlt className="inline mr-1" />
          Pages
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-2 py-3 text-xs font-medium transition-colors ${
            activeTab === 'blog'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaBlog className="inline mr-1" />
          Blog
        </button>
        <button
          onClick={() => setActiveTab('theme')}
          className={`px-2 py-3 text-xs font-medium transition-colors ${
            activeTab === 'theme'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <FaPalette className="inline mr-1" />
          Theme
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Current Blocks Tab */}
        {activeTab === 'blocks' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Page Blocks ({currentBlocks.length})
              </h2>
              <p className="text-xs text-gray-500">
                Click to select, drag to reorder
              </p>
            </div>

            <div className="space-y-2">
              {currentBlocks
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
          </div>
        )}

        {/* Add Blocks Tab */}
        {activeTab === 'add' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Add New Block
              </h2>
              <p className="text-xs text-gray-500">
                Click to add to your page
              </p>
            </div>

            <div className="space-y-2">
              {availableBlocks.map((blockType) => (
                <button
                  key={blockType}
                  onClick={() => handleAddBlock(blockType)}
                  className="w-full p-3 bg-gray-50 hover:bg-blue-50 border-2 border-transparent hover:border-blue-500 rounded-lg transition-all text-left group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{blockIcons[blockType]}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 capitalize text-sm group-hover:text-blue-600">
                        {blockType}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {blockDescriptions[blockType]}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pages Tab */}
        {activeTab === 'pages' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Pages ({site.pages?.length || 0})
              </h2>
              <p className="text-xs text-gray-500">
                Manage your site pages
              </p>
            </div>

            {/* Add New Page Button */}
            <button
              onClick={() => {
                const title = prompt('Enter page title:');
                if (title) {
                  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                  addPage({
                    slug,
                    title,
                    blocks: [],
                    seo: {
                      title,
                      description: `${title} page`,
                    },
                    isHome: site.pages?.length === 0,
                  });
                }
              }}
              className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <FaPlus className="inline mr-2" />
              New Page
            </button>

            {/* Pages List */}
            <div className="space-y-2">
              {site.pages && site.pages.length > 0 ? (
                site.pages.map((page) => (
                  <div
                    key={page.id}
                    onClick={() => setCurrentPage(page.id)}
                    className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                      site.currentPageId === page.id
                        ? 'bg-blue-50 border-2 border-blue-500 shadow-sm'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900 text-sm">
                            {page.title}
                          </p>
                          {page.isHome && (
                            <FaHome className="text-blue-600 text-xs" title="Home page" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">/{page.slug}</p>
                        <p className="text-xs text-gray-400 mt-1">{page.blocks.length} blocks</p>
                      </div>
                      {!page.isHome && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete "${page.title}" page?`)) {
                              removePage(page.id);
                            }
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                          title="Delete page"
                        >
                          <FaTrash size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 text-sm">No pages yet</p>
                  <p className="text-gray-400 text-xs mt-1">Create your first page</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Blog Posts ({site.blog?.posts.length || 0})
              </h2>
              <p className="text-xs text-gray-500">
                Manage your blog content
              </p>
            </div>

            {!site.blog?.enabled ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Blog is not enabled</p>
                <button
                  onClick={() => enableBlog()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Enable Blog
                </button>
              </div>
            ) : (
              <>
                {/* Add New Post Button */}
                <button
                  onClick={() => {
                    const title = prompt('Enter post title:');
                    if (title) {
                      const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      const category = prompt('Enter category:', 'General');
                      addBlogPost({
                        title,
                        slug,
                        excerpt: '',
                        content: '',
                        author: 'Admin',
                        category: category || 'General',
                        tags: [],
                        published: false,
                      });
                    }
                  }}
                  className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <FaPlus className="inline mr-2" />
                  New Post
                </button>

                {/* Posts List */}
                <div className="space-y-2">
                  {site.blog.posts && site.blog.posts.length > 0 ? (
                    site.blog.posts.map((post) => (
                      <div
                        key={post.id}
                        className="group relative p-3 bg-gray-50 rounded-lg border-2 border-transparent hover:border-gray-300 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{post.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                {post.category}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                post.published
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Delete "${post.title}"?`)) {
                                removeBlogPost(post.id);
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 transition-opacity"
                            title="Delete post"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-sm">No posts yet</p>
                      <p className="text-gray-400 text-xs mt-1">Create your first post</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Theme Tab */}
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

              {/* Typography Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Typography</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={site.theme.fontFamily}
                    onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    style={{ fontFamily: site.theme.fontFamily }}
                  >
                    <optgroup label="System Fonts">
                      <option value="system-ui">System Default</option>
                      <option value="Inter">Inter (Default)</option>
                    </optgroup>
                    <optgroup label="Sans Serif">
                      <option value="Roboto">Roboto</option>
                      <option value="Open Sans">Open Sans</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Raleway">Raleway</option>
                      <option value="Lato">Lato</option>
                      <option value="Nunito">Nunito</option>
                      <option value="Ubuntu">Ubuntu</option>
                    </optgroup>
                    <optgroup label="Serif">
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Merriweather">Merriweather</option>
                      <option value="Lora">Lora</option>
                      <option value="PT Serif">PT Serif</option>
                      <option value="Crimson Text">Crimson Text</option>
                    </optgroup>
                    <optgroup label="Display">
                      <option value="Bebas Neue">Bebas Neue</option>
                      <option value="Righteous">Righteous</option>
                      <option value="Fugaz One">Fugaz One</option>
                    </optgroup>
                    <optgroup label="Monospace">
                      <option value="Fira Code">Fira Code</option>
                      <option value="JetBrains Mono">JetBrains Mono</option>
                      <option value="Source Code Pro">Source Code Pro</option>
                    </optgroup>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Preview: <span style={{ fontFamily: site.theme.fontFamily }}>The quick brown fox jumps over the lazy dog</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 mb-3">
                  ✓ Theme changes apply automatically as you edit
                </p>
                <button
                  onClick={() => {
                    updateTheme({
                      primaryColor: '#3B82F6',
                      secondaryColor: '#1E40AF',
                      accentColor: '#60A5FA',
                      backgroundColor: '#FFFFFF',
                      textColor: '#1F2937',
                      fontFamily: 'Inter',
                    });
                    alert('Theme reset to default');
                  }}
                  className="w-full px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                >
                  Reset to Default Theme
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
