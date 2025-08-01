import { FileWithPreview } from "@/@types/file";
import { Button } from "./ui/button";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type UploadPreviewProps = {
  file: FileWithPreview;
  loading: boolean;
  clearFile: () => void;
};

export default function UploadPreview({
  file,
  loading,
  clearFile,
}: UploadPreviewProps) {
  if (!file) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full rounded-lg overflow-hidden">
      <Image
        width={400}
        height={300}
        src={file.preview}
        alt={file.name}
        className={cn(
          "w-full h-full object-cover rounded-lg transition-opacity duration-500",
          loading ? "animate-pulse opacity-60" : "opacity-100"
        )}
      />

      {loading && (
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            SEARCHING ANIME
          </p>
        </div>
      )}

      {!loading && (
        <Button
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 cursor-pointer"
          onClick={clearFile}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
