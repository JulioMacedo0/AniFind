"use client";
import { MAX_FILE_SIZE } from "@/constants/defaultValues";
import { fileRejectionHandler } from "@/helpers/fileRejection";
import { formatBytes } from "@/helpers/formatBytes";
import { handleFileUpload } from "@/helpers/handleFileUpload";
import { useAnimeStore } from "@/store/anime-store";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import UploadPreview from "./UploadPreview";

interface FileWithPreview extends File {
  preview: string;
}

export function DragAndDropArea() {
  const { file, isLoading, setFile, setLoading, setUploadResult, setError } =
    useAnimeStore();

  const handleFileAccepted = async (files: File[]) => {
    if (files.length === 0) return;

    const oneFile = files[0];
    if (oneFile) {
      const fileWithPreview = Object.assign(oneFile, {
        preview: URL.createObjectURL(oneFile),
      }) as FileWithPreview;

      setFile(fileWithPreview);
      setLoading(true);

      try {
        const result = await handleFileUpload(fileWithPreview);
        setUploadResult(result);

        // Scroll to results if successful
        if (result.success && result.searchResults?.top_result) {
          setTimeout(() => {
            const resultsSection = document.getElementById("results-section");
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 500);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: fileRejectionHandler,
    onDropAccepted: handleFileAccepted,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 w-full aspect-video min-h-[200px] flex flex-col items-center justify-center backdrop-blur-sm",
        isDragActive
          ? "border-blue-400 bg-blue-500/10 shadow-xl shadow-blue-500/20"
          : "border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-800/70",
        file && "border-slate-600/50 bg-slate-800/30 p-0"
      )}
    >
      <input {...getInputProps()} />

      {!file && (
        <>
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-blue-400 font-medium">Drop the image here...</p>
          ) : (
            <div className="space-y-2">
              <p className="text-lg mb-2 text-white font-medium">
                Drag an image here or click to select
              </p>
              <p className="text-sm text-gray-400">
                Support for PNG, JPG, JPEG, and WebP images
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Max size: {formatBytes(MAX_FILE_SIZE)}
              </p>
            </div>
          )}
        </>
      )}

      {file && (
        <UploadPreview
          file={file}
          loading={isLoading}
          clearFile={() => setFile(null)}
        />
      )}
    </div>
  );
}
