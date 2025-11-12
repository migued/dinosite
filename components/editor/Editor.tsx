'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import EditorSidebar from './EditorSidebar';
import EditorToolbar from './EditorToolbar';
import GoogleFontsLoader from '@/components/theme/GoogleFontsLoader';
import TextFormatToolbar from './TextFormatToolbar';
import BlockPropertiesPanel from './BlockPropertiesPanel';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export default function Editor() {
  const {
    site,
    isEditing,
    updateBlock,
    updateBlockStyle,
    viewport,
    reorderBlocks,
    getCurrentBlocks,
    selectedBlockId,
    setSelectedBlock,
  } = useEditorStore();
  const currentBlocks = getCurrentBlocks();
  const selectedBlock = currentBlocks.find(b => b.id === selectedBlockId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const sortedBlocks = currentBlocks.sort((a, b) => a.order - b.order);
      const oldIndex = sortedBlocks.findIndex((block) => block.id === active.id);
      const newIndex = sortedBlocks.findIndex((block) => block.id === over.id);

      const newBlocks = arrayMove(sortedBlocks, oldIndex, newIndex);
      reorderBlocks(newBlocks);
    }
  };

  if (!site) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No site loaded</p>
      </div>
    );
  }

  // Viewport dimensions
  const viewportStyles = {
    desktop: 'w-full',
    tablet: 'w-[768px] mx-auto shadow-2xl',
    mobile: 'w-[375px] mx-auto shadow-2xl',
  };

  return (
    <>
      {/* Load Google Fonts dynamically */}
      <GoogleFontsLoader fontFamily={site.theme.fontFamily} />

      {/* Text formatting toolbar (appears on text selection) */}
      {isEditing && <TextFormatToolbar />}

      {/* Apply font globally to editor preview */}
      <style jsx global>{`
        body {
          font-family: ${site.theme.fontFamily}, system-ui, -apple-system, sans-serif;
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <EditorSidebar />

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <EditorToolbar />

          {/* Preview */}
          <div className="flex-1 overflow-auto bg-gray-100 p-8">
            <div className={`${viewportStyles[viewport]} transition-all duration-300`}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={currentBlocks.map((b) => b.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div
                    className={`bg-white ${isEditing ? 'ring-2 ring-blue-500' : ''}`}
                    style={{ fontFamily: site.theme.fontFamily }}
                  >
                    <BlockRenderer
                      blocks={currentBlocks}
                      isEditing={isEditing}
                      onUpdateBlock={updateBlock}
                      isDraggable={isEditing}
                      theme={site.theme}
                      selectedBlockId={selectedBlockId}
                      onSelectBlock={setSelectedBlock}
                    />
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>
        </div>

        {/* Block Properties Panel */}
        {isEditing && selectedBlock && (
          <BlockPropertiesPanel
            block={selectedBlock}
            onUpdate={updateBlockStyle}
            onClose={() => setSelectedBlock(null)}
          />
        )}
      </div>
    </>
  );
}
