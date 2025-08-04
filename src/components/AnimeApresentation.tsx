"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Calendar,
  Clock,
  Users,
  Section,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnimeData {
  name: string;
  description: string;
  coverImage: string;
  previewVideo: string;
  rating: number;
  year: number;
  episodes: number;
  genre: string[];
  studio: string;
  status: "Ongoing" | "Completed" | "Upcoming";
}

const sampleAnime: AnimeData = {
  name: "Attack on Titan",
  description:
    "Humanity fights for survival against giant humanoid Titans that have brought civilization to the brink of extinction. When the Titans breach Wall Maria, Eren Yeager vows to eliminate every last Titan and reclaim the world for humanity.",
  coverImage: "/placeholder.svg?height=600&width=400",
  previewVideo: "/placeholder.svg?height=600&width=800",
  rating: 9.0,
  year: 2013,
  episodes: 87,
  genre: ["Action", "Drama", "Fantasy"],
  studio: "Mappa",
  status: "Completed",
};

export function AnimeApresentation({
  anime = sampleAnime,
}: {
  anime?: AnimeData;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Upcoming":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section className="min-h-screen w-full   overflow-hidden flex items-center justify-center p-8">
      <div className="relative p-0.5 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 shadow-[0_0_20px_rgba(96,165,250,0.3),0_0_40px_rgba(147,51,234,0.2),0_0_60px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(96,165,250,0.4),0_0_60px_rgba(147,51,234,0.3),0_0_90px_rgba(99,102,241,0.2)] transition-all duration-300 w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <div className="relative rounded-xl overflow-hidden bg-slate-900 aspect-[3/4] sm:aspect-[4/3] md:aspect-video min-h-[400px] sm:min-h-[350px] md:min-h-[400px]">
          {/* Background Video/Image */}
          <div className="absolute inset-0">
            <img
              src={anime.previewVideo || "/placeholder.svg"}
              alt={`${anime.name} preview`}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradients for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/40" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-between p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Top Section - Status and Controls */}
            <div className="flex justify-between items-start">
              <Badge
                className={`${getStatusColor(
                  anime.status
                )} backdrop-blur-sm border text-xs`}
              >
                {anime.status}
              </Badge>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border-slate-600/50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border-slate-600/50 h-8 w-8 sm:h-9 sm:w-9 p-0"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-4 sm:gap-6 items-start sm:items-end">
              {/* Mobile: Stack vertically, Desktop: Side by side */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:items-end">
                {/* Cover Image */}
                <div className="flex-shrink-0 self-center sm:self-end">
                  <img
                    src={anime.coverImage || "/placeholder.svg"}
                    alt={`${anime.name} cover`}
                    className="w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-52 lg:w-48 lg:h-64 object-cover rounded-lg shadow-2xl border border-slate-600/50"
                  />
                </div>

                {/* Anime Information */}
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg text-center sm:text-left">
                      {anime.name}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{anime.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{anime.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{anime.episodes} episodes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{anime.studio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl backdrop-blur-sm text-center sm:text-left line-clamp-3 sm:line-clamp-none">
                      {anime.description}
                    </p>

                    <div className="flex flex-wrap gap-1 sm:gap-2 justify-center sm:justify-start">
                      {anime.genre.map((g, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-slate-800/60 text-gray-300 border-slate-600/50 backdrop-blur-sm hover:bg-slate-700/60 transition-colors text-xs"
                        >
                          {g}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 w-full sm:w-auto">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg w-full sm:w-auto h-10 sm:h-9">
                      Watch Now
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-slate-800/60 border-slate-600/50 text-white hover:bg-slate-700/60 backdrop-blur-sm w-full sm:w-auto h-10 sm:h-9"
                    >
                      Add to List
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
