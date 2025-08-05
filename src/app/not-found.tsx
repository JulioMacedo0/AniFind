import { Search, Home, ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - AniFind",
  description:
    "The page you're looking for could not be found. Discover anime from screenshots with AniFind.",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black relative overflow-hidden flex items-center justify-center p-8">
      {/* Background decorative elements */}
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

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
            AniFind
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 mx-auto rounded-full" />
        </div>

        {/* 404 Number */}
        <div className="flex justify-center">
          <div className="relative p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full p-8">
              <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                404
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white">Page Not Found</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            The page you&apos;re looking for seems to have vanished into another
            dimension. Let&apos;s help you find your way back to discovering
            amazing anime!
          </p>
        </div>

        {/* Suggestion Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Search className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Try Searching</h3>
            </div>
            <p className="text-gray-400">
              Upload an anime screenshot to discover which anime it&apos;s from
              and find similar content.
            </p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <FileQuestion className="w-5 h-5 text-purple-400" />
              <h3 className="font-semibold text-white">Common Issues</h3>
            </div>
            <p className="text-gray-400">
              Check the URL for typos, or the page might have been moved or
              removed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Fun Anime Reference */}
        <div className="pt-8 border-t border-slate-700/50">
          <p className="text-gray-500 text-sm italic">
            &quot;Even the greatest anime hunters sometimes lose their
            way...&quot;
          </p>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-gray-300 text-sm mb-4">
            If you believe this is an error or need assistance finding specific
            anime content:
          </p>
          <div className="flex flex-col sm:flex-row gap-2 text-sm">
            <span className="text-gray-400">Contact us:</span>

            <span className="text-gray-500 hidden sm:inline">•</span>
            <a
              href="https://github.com/juliomacedo0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Report an Issue
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
