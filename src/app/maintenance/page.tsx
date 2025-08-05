import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maintenance - AniFind",
  description:
    "AniFind is temporarily under maintenance. We'll be back soon with amazing improvements!",
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 relative overflow-hidden flex items-center justify-center p-8">
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

      <div className="relative z-10 w-full max-w-4xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            AniFind
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mx-auto rounded-full" />
        </div>

        <div className="my-12">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-yellow-400/30">
              <div
                className="text-6xl animate-spin"
                style={{ animationDuration: "3s" }}
              >
                🔧
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400/10 to-orange-500/10 blur-xl animate-pulse" />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">Under Maintenance</h2>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our system is undergoing improvements to provide an even better
            experience for anime discovery.
            <br />
            <span className="text-blue-400 font-semibold">
              We&apos;ll be back soon!
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Advanced Search
            </h3>
            <p className="text-gray-300 text-sm">
              Improving recognition algorithms
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-md border border-purple-500/30 rounded-xl">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Performance
            </h3>
            <p className="text-gray-300 text-sm">Optimizing response speed</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-md border border-cyan-500/30 rounded-xl">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="text-lg font-semibold text-white mb-2">Interface</h3>
            <p className="text-gray-300 text-sm">Enhancing visual experience</p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" />
            <div
              className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
          <p className="text-gray-300 text-sm">Working on improvements...</p>
        </div>
      </div>
    </div>
  );
}
