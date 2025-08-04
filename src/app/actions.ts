"use server";

import { apolloServerClient } from "@/lib/apolloServer";
import { GET_ANIME_BY_ID } from "@/lib/queries";
import { redis } from "@/lib/redis";

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

interface ErrorResponse {
  error: string;
  detail?: string | null;
}

export async function fetchAnimeData(animeId: number) {
  const cacheKey = `anifind:${animeId}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    console.log("✅ Cache HIT");
    return JSON.parse(cached);
  }

  console.log("❌ Cache MISS — Fetching in Apollo");
  const { data } = await apolloServerClient.query({
    query: GET_ANIME_BY_ID,
    variables: { id: animeId },
  });

  await redis.set(cacheKey, JSON.stringify(data));

  return data;
}
export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file was uploaded");
    }

    const searchFormData = new FormData();
    searchFormData.append("image", file);

    const apiUrl = "http://172.17.0.1:8000/api/v1/search";
    const response = await fetch(apiUrl, {
      method: "POST",
      body: searchFormData,
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      console.error("Search API Error:", errorData);
      return {
        success: false,
        message: `Search failed: ${errorData.error}`,
        error: errorData,
      };
    }

    const searchResults: SearchResponse = await response.json();
    const animeData = await fetchAnimeData(
      searchResults.top_result?.anime_id || 0
    );

    const transformedAnimeData =
      animeData?.Media && searchResults.top_result
        ? {
            name:
              animeData.Media.title?.english ||
              animeData.Media.title?.romaji ||
              "Unknown Title",
            description:
              animeData.Media.description?.replace(/<[^>]*>/g, "") ||
              "No description available",
            coverImage:
              animeData.Media.coverImage?.extraLarge ||
              animeData.Media.coverImage?.large ||
              "",
            video: searchResults.top_result.preview_video || "",
            rating: (animeData.Media.averageScore || 0) / 10,
            year: animeData.Media.startDate?.year || new Date().getFullYear(),
            episodes: animeData.Media.episodes || 0,
            genre: animeData.Media.genres || [],
            studio:
              animeData.Media.studios?.nodes?.[0]?.name || "Unknown Studio",
            status:
              animeData.Media.status === "FINISHED"
                ? ("Completed" as const)
                : animeData.Media.status === "RELEASING"
                ? ("Ongoing" as const)
                : animeData.Media.status === "NOT_YET_RELEASED"
                ? ("Upcoming" as const)
                : ("Completed" as const),
            matchPercentage:
              Math.round(searchResults.top_result.similarity * 100) / 100,
            season: searchResults.top_result.season,
            episode: searchResults.top_result.episode,
            timeCode: searchResults.top_result.timecode,
          }
        : null;

    return {
      success: true,
      message: `File "${file.name}" uploaded and searched successfully!`,
      fileInfo: {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      },
      searchResults,
      animeData: transformedAnimeData,
    };
  } catch (error) {
    console.error("Upload/Search error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
