import { create } from "zustand";
import type {
  AnimeData,
  SearchResult,
  UploadResult,
  FileWithPreview,
} from "@/@types";

interface AnimeStore {
  // States
  file: FileWithPreview | null;
  isLoading: boolean;
  uploadResult: UploadResult | null;
  error: string | null;

  // Actions
  setFile: (file: FileWithPreview | null) => void;
  setLoading: (loading: boolean) => void;
  setUploadResult: (result: UploadResult | null) => void;
  setError: (error: string | null) => void;
  clearAll: () => void;

  // Computed
  hasResults: () => boolean;
  getTopResult: () => SearchResult | null;
  getAllResults: () => SearchResult | null;
  getAnimeData: () => AnimeData | null;
}

export const useAnimeStore = create<AnimeStore>((set, get) => ({
  // Initial states
  file: null,
  isLoading: false,
  uploadResult: null,
  error: null,

  // Actions
  setFile: (file) => set({ file }),
  setLoading: (isLoading) => set({ isLoading }),
  setUploadResult: (uploadResult) => set({ uploadResult, error: null }),
  setError: (error) => set({ error, isLoading: false }),
  clearAll: () =>
    set({ file: null, isLoading: false, uploadResult: null, error: null }),

  // Computed
  hasResults: () => {
    const state = get();

    return !!state.uploadResult?.success;
  },
  getTopResult: () => {
    const state = get();
    return state.uploadResult?.searchResults?.result || null;
  },
  getAllResults: () => {
    const state = get();
    return state.uploadResult?.searchResults?.result || null;
  },
  getAnimeData: () => {
    const state = get();
    return state.uploadResult?.animeData || null;
  },
}));
