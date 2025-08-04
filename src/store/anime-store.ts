import { create } from "zustand";

interface SearchResult {
  rank: number;
  anime: string;
  season: number;
  episode: number;
  timecode: string;
  second: number;
  similarity: number;
  anime_id: number;
  source_file: string;
  preview_source_path: string;
  preview_video?: string | null;
}

interface SearchResponse {
  top_result?: SearchResult | null;
  all_results: SearchResult[];
  preview_url?: string | null;
}

interface FileInfo {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}

interface AnimeData {
  name: string;
  description: string;
  coverImage: string;
  video: string;
  rating: number;
  year: number;
  episodes: number;
  genre: string[];
  studio: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  matchPercentage: number;
  season: number;
  episode: number;
  timeCode: string;
  streamingUrl?: string | null;
}

interface UploadResult {
  success: boolean;
  message: string;
  fileInfo?: FileInfo;
  searchResults?: SearchResponse;
  animeData?: AnimeData | null;
  error?: {
    error: string;
    detail?: string | null;
  };
}

interface FileWithPreview extends File {
  preview: string;
}

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
  getAllResults: () => SearchResult[];
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
    return !!(
      state.uploadResult?.success &&
      state.uploadResult?.searchResults?.top_result
    );
  },
  getTopResult: () => {
    const state = get();
    return state.uploadResult?.searchResults?.top_result || null;
  },
  getAllResults: () => {
    const state = get();
    return state.uploadResult?.searchResults?.all_results || [];
  },
  getAnimeData: () => {
    const state = get();
    return state.uploadResult?.animeData || null;
  },
}));
