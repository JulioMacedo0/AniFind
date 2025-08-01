import { UploadSection } from "@/components/UploadSection";
import { AnimeResults } from "@/components/AnimeResults";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <main>
        <UploadSection />
        <AnimeResults />
      </main>
    </div>
  );
}
