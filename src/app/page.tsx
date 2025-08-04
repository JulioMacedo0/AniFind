"use client";

import { UploadSection } from "@/components/UploadSection";
import { AnimeApresentation } from "@/components/AnimeApresentation";
import { useAnimeStore } from "@/store/anime-store";

export default function Home() {
  const { hasResults, getAnimeData } = useAnimeStore();
  const animeData = getAnimeData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <main>
        <UploadSection />
        {hasResults() && animeData && <AnimeApresentation anime={animeData} />}
      </main>
    </div>
  );
}
