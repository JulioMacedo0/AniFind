"use client";
import { useAnimeStore } from "@/store/anime-store";
import {
  Loader2,
  Star,
  Clock,
  Calendar,
  Film,
  Play,
  Search,
} from "lucide-react";

export function AnimeResults() {
  const { isLoading, uploadResult, error, hasResults } = useAnimeStore();

  if (!isLoading && !hasResults() && !error) {
    return null;
  }

  return (
    <section
      id="results-section"
      className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden flex items-center justify-center p-8"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "5s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {isLoading && (
          <div className="text-center space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-blue-400 mx-auto" />
              <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400/30 rounded-full mx-auto animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">
                Analyzing your image
              </h2>
              <p className="text-lg text-gray-300">
                Searching through our anime database...
              </p>
              <div className="flex justify-center space-x-2 mt-4">
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-red-900/50 border border-red-500/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
              <span className="text-2xl">😞</span>
            </div>
            <h2 className="text-2xl font-bold text-red-400">
              Oops! Something went wrong
            </h2>
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors border border-red-500/30"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State - Results */}
        {!isLoading && hasResults() && uploadResult?.searchResults && (
          <div className="space-y-8">
            {/* Top Result */}
            {uploadResult.searchResults.top_result && (
              <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 ring-1 ring-white/10">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl">🎌</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Anime Found!</h2>
                      <p className="text-blue-100">
                        Best match from our database
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Anime Info */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-3xl font-bold text-white leading-tight">
                          {uploadResult.searchResults.top_result.anime.replace(
                            /-/g,
                            " "
                          )}
                        </h3>

                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-2xl font-bold text-green-400">
                            {uploadResult.searchResults.top_result.similarity.toFixed(
                              1
                            )}
                            %
                          </span>
                          <span className="text-gray-300">match</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30">
                          <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">Season</span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {uploadResult.searchResults.top_result.season}
                          </p>
                        </div>

                        <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-slate-600/30">
                          <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <Film className="w-4 h-4" />
                            <span className="text-sm font-medium">Episode</span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {uploadResult.searchResults.top_result.episode}
                          </p>
                        </div>

                        <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 col-span-2 border border-slate-600/30">
                          <div className="flex items-center gap-2 text-gray-300 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Timecode
                            </span>
                          </div>
                          <p className="text-xl font-bold text-white">
                            {uploadResult.searchResults.top_result.timecode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Video Preview */}
                    {uploadResult.searchResults.top_result.preview_video && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Play className="w-5 h-5 text-blue-400" />
                          <h4 className="text-lg font-semibold text-white">
                            Scene Preview
                          </h4>
                        </div>
                        <div className="aspect-video rounded-xl overflow-hidden bg-slate-900/50 shadow-2xl border border-slate-600/30">
                          <video
                            autoPlay
                            muted
                            loop
                            src={
                              uploadResult.searchResults.top_result
                                .preview_video
                            }
                            controls
                            className="w-full h-full object-cover"
                          >
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  useAnimeStore.getState().clearAll();
                }}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-500 hover:via-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:scale-105 border border-white/10 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3 justify-center">
                  <Search className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
                  Search Another Anime
                </div>
              </button>
              <p className="text-sm text-gray-400">
                Found what you were looking for? Try searching with another
                image!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
