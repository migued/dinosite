import { create } from 'zustand';
import { Block } from '@/types/blocks';
import { Site, Viewport } from '@/types/site';

interface HistoryState {
  past: Site[];
  present: Site | null;
  future: Site[];
}

interface EditorState {
  site: Site | null;
  isEditing: boolean;
  selectedBlockId: string | null;
  viewport: Viewport;
  history: HistoryState;

  // Basic actions
  setSite: (site: Site) => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedBlock: (blockId: string | null) => void;
  setViewport: (viewport: Viewport) => void;

  // Block actions
  updateBlock: (blockId: string, data: any) => void;
  addBlock: (block: Block) => void;
  removeBlock: (blockId: string) => void;
  reorderBlocks: (blocks: Block[]) => void;

  // Theme actions
  updateTheme: (theme: Partial<Site['theme']>) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Persistence
  saveSite: () => void;
}

const saveToHistory = (state: EditorState, newSite: Site): EditorState => {
  if (!state.site) return state;

  return {
    ...state,
    site: newSite,
    history: {
      past: [...state.history.past, state.site],
      present: newSite,
      future: [],
    },
  };
};

export const useEditorStore = create<EditorState>((set, get) => ({
  site: null,
  isEditing: false,
  selectedBlockId: null,
  viewport: 'desktop',
  history: {
    past: [],
    present: null,
    future: [],
  },

  setSite: (site) => set({
    site,
    history: {
      past: [],
      present: site,
      future: [],
    }
  }),

  setIsEditing: (isEditing) => set({ isEditing }),

  setSelectedBlock: (blockId) => set({ selectedBlockId: blockId }),

  setViewport: (viewport) => set({ viewport }),

  updateBlock: (blockId, data) =>
    set((state) => {
      if (!state.site) return state;

      const updatedBlocks = state.site.blocks.map((block) =>
        block.id === blockId
          ? { ...block, data: { ...block.data, ...data } }
          : block
      );

      const newSite = {
        ...state.site,
        blocks: updatedBlocks,
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  addBlock: (block) =>
    set((state) => {
      if (!state.site) return state;

      const newSite = {
        ...state.site,
        blocks: [...state.site.blocks, block],
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  removeBlock: (blockId) =>
    set((state) => {
      if (!state.site) return state;

      const newSite = {
        ...state.site,
        blocks: state.site.blocks.filter((block) => block.id !== blockId),
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  reorderBlocks: (blocks) =>
    set((state) => {
      if (!state.site) return state;

      const newSite = {
        ...state.site,
        blocks: blocks.map((block, index) => ({ ...block, order: index })),
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  updateTheme: (theme) =>
    set((state) => {
      if (!state.site) return state;

      const newSite = {
        ...state.site,
        theme: {
          ...state.site.theme,
          ...theme,
        },
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  undo: () =>
    set((state) => {
      if (state.history.past.length === 0) return state;

      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, state.history.past.length - 1);

      return {
        ...state,
        site: previous,
        history: {
          past: newPast,
          present: previous,
          future: state.site ? [state.site, ...state.history.future] : state.history.future,
        },
      };
    }),

  redo: () =>
    set((state) => {
      if (state.history.future.length === 0) return state;

      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);

      return {
        ...state,
        site: next,
        history: {
          past: state.site ? [...state.history.past, state.site] : state.history.past,
          present: next,
          future: newFuture,
        },
      };
    }),

  canUndo: () => get().history.past.length > 0,

  canRedo: () => get().history.future.length > 0,

  saveSite: () => {
    const state = get();
    if (!state.site || typeof window === 'undefined') return;

    localStorage.setItem(`site_${state.site.id}`, JSON.stringify(state.site));
  },
}));

// Auto-save every 3 seconds
if (typeof window !== 'undefined') {
  setInterval(() => {
    useEditorStore.getState().saveSite();
  }, 3000);
}
