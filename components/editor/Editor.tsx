'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import EditorSidebar from './EditorSidebar';
import EditorToolbar from './EditorToolbar';

export default function Editor() {
  const { site, isEditing, updateBlock } = useEditorStore();

  if (!site) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No site loaded</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <EditorSidebar />

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <EditorToolbar />

        {/* Preview */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}>
            <BlockRenderer
              blocks={site.blocks}
              isEditing={isEditing}
              onUpdateBlock={updateBlock}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
