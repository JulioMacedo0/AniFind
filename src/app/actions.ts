"use server";
import { createApolloServerClient } from "@/lib/apolloServer";
import { GET_ANIME_BY_ID } from "@/lib/queries";
import { redis } from "@/lib/redis";
import {
  createNotFoundPlaceholder,
  createErrorPlaceholder,
} from "@/lib/placeholders";
import type { SearchResponse, ExternalLink } from "@/@types";

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
  const { data } = await createApolloServerClient().query({
    query: GET_ANIME_BY_ID,
    variables: { id: animeId },
  });

  await redis.set(cacheKey, JSON.stringify(data));

  return data;
}

function findBestStreamingUrl(externalLinks: ExternalLink[]): string | null {
  if (!externalLinks || externalLinks.length === 0) return null;

  // Filter only streaming links
  const streamingLinks = externalLinks.filter(
    (link) => link.type === "STREAMING"
  );

  if (streamingLinks.length === 0) return null;

  // Priority order: Crunchyroll -> Prime Video -> Netflix -> any other streaming
  const priorities = ["Crunchyroll", "Amazon Prime Video", "Netflix"];

  // Find by priority
  for (const priority of priorities) {
    const found = streamingLinks.find((link) =>
      link.site.toLowerCase().includes(priority.toLowerCase())
    );
    if (found) return found.url;
  }

  // If no priority match, return the first streaming link
  return streamingLinks[0]?.url || null;
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

      if (response.status === 404) {
        console.log("🔍 No anime found - similarity below threshold");
        return {
          success: true,
          message: "No matching anime found with sufficient similarity",
          fileInfo: {
            name: file.name,
            type: file.type,
            size: file.size,
            lastModified: file.lastModified,
          },
          searchResults: null,
          animeData: createNotFoundPlaceholder(),
        };
      }

      return {
        success: true,
        message: `Search failed: ${errorData.error}`,
        error: errorData,
        animeData: createErrorPlaceholder(errorData.error),
      };
    }

    const searchResults: SearchResponse = await response.json();
    const animeData = await fetchAnimeData(searchResults.result?.anime_id || 0);

    const transformedAnimeData =
      animeData?.Media && searchResults.result
        ? {
            name:
              animeData.Media.title?.english ||
              animeData.Media.title?.romaji ||
              animeData.Media.title?.native ||
              "Unknown Title",
            description:
              animeData.Media.description?.replace(/<[^>]*>/g, "") ||
              "No description available",
            coverImage:
              animeData.Media.coverImage?.extraLarge ||
              animeData.Media.coverImage?.large ||
              "",
            video: searchResults.result.preview_video || "",
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
              Math.round(searchResults.result.similarity * 100) / 100,
            season: searchResults.result.season,
            episode: searchResults.result.episode,
            timeCode: searchResults.result.timecode,
            streamingUrl: findBestStreamingUrl(
              animeData.Media.externalLinks || []
            ),
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
      success: true,
      message: error instanceof Error ? error.message : "Unknown error",
      animeData: createErrorPlaceholder(
        error instanceof Error ? error.message : "Unknown error occurred"
      ),
    };
  }
}
