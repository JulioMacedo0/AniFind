import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-slate-800/50 text-white py-12">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left: Brand */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              AniFind
            </h3>
            <p className="text-gray-400 text-sm">
              Discover anime from screenshots instantly
            </p>
          </div>

          {/* Center: Love Message */}
          <div className="text-center">
            <p className="text-gray-400 flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-400 fill-current" />{" "}
              for anime fans
            </p>
          </div>

          {/* Right: GitHub */}
          <div className="flex justify-end">
            <a
              href="https://github.com/juliomacedo0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 px-6 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <Github className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <div className="text-left">
                <p className="text-white font-medium">Julio Macedo</p>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  @juliomacedo0
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 AniFind. All rights reserved. Built with Next.js and love for
            anime.
          </p>
        </div>
      </div>
    </footer>
  );
}
