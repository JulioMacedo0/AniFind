import type { AnimeData } from "@/@types";

/**
 * Creates placeholder data for when the anime is not found (404)
 * Maintains visual consistency in the UI
 */
export function createNotFoundPlaceholder(): AnimeData {
  return {
    name: "Anime Not Found",
    description:
      "We couldn't find a match for this image. The similarity was below our minimum threshold. Try uploading a clearer image or a different scene from the anime.",
    coverImage: "/404.png",
    video: "/404.mp4",
    rating: 10,
    year: new Date().getFullYear(),
    episodes: 12,
    genre: ["Kitten"],
    studio: "Kitten Studio",
    status: "Completed" as const,
    matchPercentage: 999,
    season: 1,
    episode: 1,
    timeCode: "00:00",
    streamingUrl: null,
    isNotFound: true,
  };
}

/**
 * Creates placeholder data for generic errors
 */
export function createErrorPlaceholder(errorMessage?: string): AnimeData {
  return {
    name: "Search Error",
    description:
      errorMessage ||
      "An error occurred while searching for the anime. Please try again.",
    coverImage: "/500.png",
    video: "/500.mp4",
    rating: 10,
    year: new Date().getFullYear(),
    episodes: 12,
    genre: ["Kitten"],
    studio: "Kitten Studio",
    status: "Completed" as const,
    matchPercentage: 999,
    season: 1,
    episode: 1,
    timeCode: "00:00",
    streamingUrl: null,
    isError: true,
  };
}
