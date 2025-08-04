export interface AnimeData {
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

export interface SearchResult {
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

export interface SearchResponse {
  top_result?: SearchResult | null;
  all_results: SearchResult[];
  preview_url?: string | null;
}

export interface FileInfo {
  name: string;
  type: string;
  size: number;
  lastModified: number;
}

export interface UploadResult {
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

export interface ExternalLink {
  site: string;
  url: string;
  type: string;
  language: string | null;
}
