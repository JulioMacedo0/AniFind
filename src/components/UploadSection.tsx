"use client";
import { DragAndDropArea } from "./DragAndDropArea";

export function UploadSection() {
  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden flex items-center justify-center p-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            AniFind
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover anime from screenshots instantly. Upload any image and we
            will identify the anime, episode, and exact scene for you.
          </p>
        </div>

        <div className="w-full">
          <DragAndDropArea />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center space-y-3 group">
            <div className="w-12 h-12 bg-blue-900/50 group-hover:bg-blue-800/60 backdrop-blur-sm border border-blue-700/30 rounded-full flex items-center justify-center mx-auto transition-all duration-200">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="font-semibold text-white">Perceptual Hashing</h3>
            <p className="text-sm text-gray-400">
              Advanced phash, dhash, and ahash algorithms for robust visual
              similarity detection
            </p>
          </div>

          <div className="text-center space-y-3 group">
            <div className="w-12 h-12 bg-green-900/50 group-hover:bg-green-800/60 backdrop-blur-sm border border-green-700/30 rounded-full flex items-center justify-center mx-auto transition-all duration-200">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-white">FAISS Powered</h3>
            <p className="text-sm text-gray-400">
              Lightning-fast vector search with FAISS indexing for millisecond
              query responses
            </p>
          </div>

          <div className="text-center space-y-3 group">
            <div className="w-12 h-12 bg-purple-900/50 group-hover:bg-purple-800/60 backdrop-blur-sm border border-purple-700/30 rounded-full flex items-center justify-center mx-auto transition-all duration-200">
              <span className="text-2xl">🎬</span>
            </div>
            <h3 className="font-semibold text-white">Video Previews</h3>
            <p className="text-sm text-gray-400">
              Automatic scene preview generation with FFmpeg and cloud storage
              integration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
