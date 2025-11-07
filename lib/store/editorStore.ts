import { create } from 'zustand';
import { Block } from '@/types/blocks';
import { Site } from '@/types/site';

interface EditorState {
  site: Site | null;
  isEditing: boolean;
  selectedBlockId: string | null;
  setSite: (site: Site) => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedBlock: (blockId: string | null) => void;
  updateBlock: (blockId: string, data: any) => void;
  addBlock: (block: Block) => void;
  removeBlock: (blockId: string) => void;
  reorderBlocks: (blocks: Block[]) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  site: null,
  isEditing: false,
  selectedBlockId: null,

  setSite: (site) => set({ site }),

  setIsEditing: (isEditing) => set({ isEditing }),

  setSelectedBlock: (blockId) => set({ selectedBlockId: blockId }),

  updateBlock: (blockId, data) =>
    set((state) => {
      if (!state.site) return state;

      const updatedBlocks = state.site.blocks.map((block) =>
        block.id === blockId
          ? { ...block, data: { ...block.data, ...data } }
          : block
      );

      return {
        site: {
          ...state.site,
          blocks: updatedBlocks,
        },
      };
    }),

  addBlock: (block) =>
    set((state) => {
      if (!state.site) return state;

      return {
        site: {
          ...state.site,
          blocks: [...state.site.blocks, block],
        },
      };
    }),

  removeBlock: (blockId) =>
    set((state) => {
      if (!state.site) return state;

      return {
        site: {
          ...state.site,
          blocks: state.site.blocks.filter((block) => block.id !== blockId),
        },
      };
    }),

  reorderBlocks: (blocks) =>
    set((state) => {
      if (!state.site) return state;

      return {
        site: {
          ...state.site,
          blocks,
        },
      };
    }),
}));
