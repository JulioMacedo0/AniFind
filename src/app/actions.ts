"use server";

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

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file was uploaded");
    }

    console.log("=== FILE RECEIVED ===");
    console.log("Name:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", file.size, "bytes");
    console.log("Last Modified:", new Date(file.lastModified));

    // Prepare form data for the search API
    const searchFormData = new FormData();
    searchFormData.append("image", file);

    // Call the search API
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

    console.log("=== SEARCH RESULTS ===");
    console.log("Top Result:", searchResults.top_result);
    console.log("Total Results:", searchResults.all_results.length);

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
    };
  } catch (error) {
    console.error("Upload/Search error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
