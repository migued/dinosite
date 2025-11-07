import { create } from 'zustand';
import { Block } from '@/types/blocks';
import { Site, Viewport, Page, BlogPost } from '@/types/site';

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

  // Getters
  getCurrentBlocks: () => Block[];

  // Basic actions
  setSite: (site: Site) => void;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedBlock: (blockId: string | null) => void;
  setViewport: (viewport: Viewport) => void;

  // Block actions (works with current page or legacy blocks)
  updateBlock: (blockId: string, data: any) => void;
  addBlock: (block: Block) => void;
  removeBlock: (blockId: string) => void;
  reorderBlocks: (blocks: Block[]) => void;

  // Page actions
  addPage: (page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => void;
  updatePage: (pageId: string, data: Partial<Page>) => void;
  removePage: (pageId: string) => void;
  setCurrentPage: (pageId: string) => void;

  // Blog actions
  addBlogPost: (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => void;
  updateBlogPost: (postId: string, data: Partial<BlogPost>) => void;
  removeBlogPost: (postId: string) => void;
  enableBlog: () => void;

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

// Helper to get blocks from current page or legacy blocks
const getCurrentBlocks = (site: Site): Block[] => {
  // Multi-page site
  if (site.pages && site.pages.length > 0) {
    const currentPage = site.pages.find(p => p.id === site.currentPageId) || site.pages[0];
    return currentPage.blocks;
  }
  // Legacy single-page site
  return site.blocks || [];
};

// Helper to update blocks in current page or legacy blocks
const updateCurrentBlocks = (site: Site, blocks: Block[]): Site => {
  // Multi-page site
  if (site.pages && site.pages.length > 0) {
    const currentPageId = site.currentPageId || site.pages[0].id;
    return {
      ...site,
      pages: site.pages.map(page =>
        page.id === currentPageId
          ? { ...page, blocks, updated_at: new Date().toISOString() }
          : page
      ),
      updated_at: new Date().toISOString(),
    };
  }
  // Legacy single-page site
  return {
    ...site,
    blocks,
    updated_at: new Date().toISOString(),
  };
};

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

  getCurrentBlocks: () => {
    const state = get();
    if (!state.site) return [];
    return getCurrentBlocks(state.site);
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

      const currentBlocks = getCurrentBlocks(state.site);
      const updatedBlocks = currentBlocks.map((block) =>
        block.id === blockId
          ? { ...block, data: { ...block.data, ...data } }
          : block
      );

      const newSite = updateCurrentBlocks(state.site, updatedBlocks);
      return saveToHistory(state, newSite);
    }),

  addBlock: (block) =>
    set((state) => {
      if (!state.site) return state;

      const currentBlocks = getCurrentBlocks(state.site);
      const newSite = updateCurrentBlocks(state.site, [...currentBlocks, block]);

      return saveToHistory(state, newSite);
    }),

  removeBlock: (blockId) =>
    set((state) => {
      if (!state.site) return state;

      const currentBlocks = getCurrentBlocks(state.site);
      const updatedBlocks = currentBlocks.filter((block) => block.id !== blockId);
      const newSite = updateCurrentBlocks(state.site, updatedBlocks);

      return saveToHistory(state, newSite);
    }),

  reorderBlocks: (blocks) =>
    set((state) => {
      if (!state.site) return state;

      const reorderedBlocks = blocks.map((block, index) => ({ ...block, order: index }));
      const newSite = updateCurrentBlocks(state.site, reorderedBlocks);

      return saveToHistory(state, newSite);
    }),

  // Page management
  addPage: (pageData) =>
    set((state) => {
      if (!state.site) return state;

      const now = new Date().toISOString();
      const newPage: Page = {
        ...pageData,
        id: crypto.randomUUID(),
        created_at: now,
        updated_at: now,
      };

      const newSite = {
        ...state.site,
        pages: [...(state.site.pages || []), newPage],
        updated_at: now,
      };

      return saveToHistory(state, newSite);
    }),

  updatePage: (pageId, data) =>
    set((state) => {
      if (!state.site) return state;

      const newSite = {
        ...state.site,
        pages: (state.site.pages || []).map(page =>
          page.id === pageId
            ? { ...page, ...data, updated_at: new Date().toISOString() }
            : page
        ),
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  removePage: (pageId) =>
    set((state) => {
      if (!state.site || !state.site.pages) return state;

      // Don't allow deleting the last page
      if (state.site.pages.length <= 1) {
        alert('Cannot delete the last page');
        return state;
      }

      const newSite = {
        ...state.site,
        pages: state.site.pages.filter(page => page.id !== pageId),
        currentPageId: state.site.currentPageId === pageId
          ? state.site.pages.find(p => p.id !== pageId)?.id
          : state.site.currentPageId,
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  setCurrentPage: (pageId) =>
    set((state) => {
      if (!state.site) return state;

      return {
        ...state,
        site: {
          ...state.site,
          currentPageId: pageId,
        },
      };
    }),

  // Blog management
  enableBlog: () =>
    set((state) => {
      if (!state.site) return state;

      const newSite = {
        ...state.site,
        blog: {
          enabled: true,
          posts: [],
          categories: [],
        },
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  addBlogPost: (postData) =>
    set((state) => {
      if (!state.site) return state;

      const now = new Date().toISOString();
      const newPost: BlogPost = {
        ...postData,
        id: crypto.randomUUID(),
        created_at: now,
        updated_at: now,
      };

      // Add category if it doesn't exist
      const categories = state.site.blog?.categories || [];
      if (!categories.includes(newPost.category)) {
        categories.push(newPost.category);
      }

      const newSite = {
        ...state.site,
        blog: {
          enabled: true,
          posts: [...(state.site.blog?.posts || []), newPost],
          categories,
        },
        updated_at: now,
      };

      return saveToHistory(state, newSite);
    }),

  updateBlogPost: (postId, data) =>
    set((state) => {
      if (!state.site || !state.site.blog) return state;

      const newSite = {
        ...state.site,
        blog: {
          ...state.site.blog,
          posts: state.site.blog.posts.map(post =>
            post.id === postId
              ? { ...post, ...data, updated_at: new Date().toISOString() }
              : post
          ),
        },
        updated_at: new Date().toISOString(),
      };

      return saveToHistory(state, newSite);
    }),

  removeBlogPost: (postId) =>
    set((state) => {
      if (!state.site || !state.site.blog) return state;

      const newSite = {
        ...state.site,
        blog: {
          ...state.site.blog,
          posts: state.site.blog.posts.filter(post => post.id !== postId),
        },
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
