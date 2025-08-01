"use client";
import { MAX_FILE_SIZE } from "@/constants/defaultValues";
import { fileAcceptedFileHandler } from "@/helpers/fileaccpeted";
import { fileRejectionHandler } from "@/helpers/fileRejection";
import { formatBytes } from "@/helpers/formatBytes";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadPreview from "./UploadPreview";

interface FileWithPreview extends File {
  preview: string;
}

export function DragAndDropArea() {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    onDropRejected: fileRejectionHandler,
    onDropAccepted: (files) => fileAcceptedFileHandler(files, setFile),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors w-full aspect-video min-h-[200px] flex flex-col items-center justify-center",
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400",
        file && "border-gray-200 bg-gray-50 p-0"
      )}
    >
      <input {...getInputProps()} />

      {!file && (
        <>
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-blue-600">Drop the image here...</p>
          ) : (
            <div>
              <p className="text-lg mb-2">
                Drag an image here or click to select
              </p>
              <p className="text-sm text-gray-500">
                Support for PNG, JPG, JPEG, and WebP images
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max size: {formatBytes(MAX_FILE_SIZE)}
              </p>
            </div>
          )}
        </>
      )}

      {file && (
        <UploadPreview
          file={file}
          loading={true}
          clearFile={() => setFile(null)}
        />
      )}
    </div>
  );
}
