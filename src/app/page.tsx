import { UploadSection } from "@/components/UploadSection";
import { AnimeResults } from "@/components/AnimeResults";
import { AnimeApresentation } from "@/components/AnimeApresentation";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black">
      <main>
        <UploadSection />
        <AnimeApresentation />
      </main>
    </div>
  );
}
