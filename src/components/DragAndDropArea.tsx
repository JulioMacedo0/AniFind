"use client";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "@/constants/defaultValues";
import { fileRejectionHandler } from "@/helpers/fileRejection";
import { formatBytes } from "@/helpers/formatBytes";
import { getSupportedFileTypes } from "@/helpers/getSupportedFileTypes";
import { handleFileUpload } from "@/helpers/handleFileUpload";
import { useAnimeStore } from "@/store/anime-store";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import UploadPreview from "./UploadPreview";
import type { FileWithPreview } from "@/@types";

import { useClipboardFiles } from "@/hooks/useClipboardFiles";

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

        if (result.success) {
          setTimeout(() => {
            const resultsSection = document.getElementById("results-section");
            if (resultsSection) {
              resultsSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 500);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        setError(error instanceof Error ? error.message : "Upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  useClipboardFiles((file) => handleFileAccepted([file]));

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: fileRejectionHandler,
    onDropAccepted: handleFileAccepted,
    accept: ACCEPTED_MIME_TYPES,
    disabled: !!file,
  });

  return (
    <div className="relative p-0.5 rounded-xl bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 shadow-[0_0_20px_rgba(96,165,250,0.3),0_0_40px_rgba(147,51,234,0.2),0_0_60px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(96,165,250,0.4),0_0_60px_rgba(147,51,234,0.3),0_0_90px_rgba(99,102,241,0.2)] transition-all duration-300">
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 w-full aspect-video min-h-[200px] flex flex-col items-center justify-center backdrop-blur-sm",
          isDragActive
            ? "border-blue-400/50 bg-blue-500/10 ring-2 ring-blue-400/30"
            : "border-transparent bg-slate-800/90 hover:bg-slate-800/95",
          file && "border-transparent bg-slate-800/80 p-0"
        )}
      >
        <input {...getInputProps()} />

        {!file && (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            {isDragActive ? (
              <p className="text-blue-400 font-medium">
                Drop the image here...
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg mb-2 text-white font-medium">
                  Drag an image here or click to select
                </p>
                <p className="text-sm text-gray-400">
                  Support for {getSupportedFileTypes()} images
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
    </div>
  );
}
