"use client";

import { useState, useCallback } from "react";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { File, Upload, X, Loader2 } from "lucide-react";
import { uploadFile } from "@/app/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { formatBytes } from "@/helpers/formatBytes";

interface FileWithPreview extends File {
  preview: string;
}

interface SearchResult {
  rank: number;
  anime: string;
  season: number;
  episode: number;
  timecode: string;
  second: number;
  similarity: number;
  anime_id: number;
  source_file: string;
  preview_source_path: string;
  preview_video?: string | null;
}

interface SearchResponse {
  top_result?: SearchResult | null;
  all_results: SearchResult[];
  preview_url?: string | null;
}

interface UploadResult {
  success: boolean;
  message: string;
  fileInfo?: {
    name: string;
    type: string;
    size: number;
    lastModified: number;
  };
  searchResults?: SearchResponse;
  error?: {
    error: string;
    detail?: string | null;
  };
}

interface FileUploadProps {
  maxFileSize?: number; // in bytes
}

export default function FileUpload({
  maxFileSize = 5 * 1024 * 1024, // 5MB default
}: FileUploadProps = {}) {
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Check for rejected files (size too large, wrong type, etc.)
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error) => {
            if (error.code === ErrorCode.FileTooLarge) {
              toast.error(`File "${file.name}" is too large`, {
                description: `Maximum file size is ${formatBytes(
                  maxFileSize
                )}. Your file is ${formatBytes(file.size)}.`,
              });
            } else if (error.code === ErrorCode.FileInvalidType) {
              toast.error(`File "${file.name}" has invalid type`, {
                description:
                  "Only PNG, JPG, JPEG, GIF, and WebP images are supported.",
              });
            }
          });
        });
        return;
      }

      // Take only the first file
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        // Clear previous file if exists
        if (file) {
          URL.revokeObjectURL(file.preview);
        }

        const fileWithPreview = Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        }) as FileWithPreview;

        setFile(fileWithPreview);
        setResult(null);

        // Auto upload the file
        handleFileUpload(fileWithPreview);
      }
    },
    [maxFileSize, file]
  );

  const handleFileUpload = async (fileToUpload: FileWithPreview) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const uploadResult = await uploadFile(formData);

      setResult(uploadResult);

      // Print results to console as requested
      console.log("=== UPLOAD COMPLETED ===");
      console.log("Result:", uploadResult);
      if (uploadResult.success && uploadResult.fileInfo) {
        console.log("File Info:", uploadResult.fileInfo);
      }

      if (uploadResult.success) {
        toast.success(`File "${fileToUpload.name}" uploaded successfully!`);
      } else {
        toast.error(`Failed to upload "${fileToUpload.name}"`, {
          description: uploadResult.message,
        });
      }
    } catch (error) {
      const errorMessage = `Error uploading ${fileToUpload.name}: ${error}`;
      setResult({
        success: false,
        message: errorMessage,
      });

      console.error("=== UPLOAD ERROR ===");
      console.error("Error:", errorMessage);

      toast.error(`Upload failed for "${fileToUpload.name}"`, {
        description: `Unexpected error occurred: ${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
      setFile(null);
      setResult(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: maxFileSize,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Image Upload</h2>

      {/* Preview da Imagem com Loading */}
      {file && (
        <div className="relative mb-6">
          <div className="relative">
            <Image
              width={400}
              height={300}
              src={file.preview}
              alt={file.name}
              className={cn(
                "w-full h-64 object-cover rounded-lg border-2 transition-opacity duration-500",
                loading ? "animate-pulse opacity-60" : "opacity-100"
              )}
            />

            {/* Texto de Loading sobreposto */}
            {loading && (
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 px-3 py-2 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  SEARCHING ANIME
                </p>
              </div>
            )}

            {/* Botão para remover arquivo */}
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

          {/* Informações do arquivo */}
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-xs">
              {formatBytes(file.size)} • {file.type}
            </p>
          </div>

          {/* Status do Upload e Resultados da Busca */}
          {result && (
            <div className="mt-3 space-y-3">
              {/* Resultados da Busca de Anime */}
              {result.success && result.searchResults?.top_result && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    🎌 Anime Found!
                  </h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-blue-800">
                          {result.searchResults.top_result.anime.replace(
                            /-/g,
                            ""
                          )}
                        </p>
                        <p className="text-sm text-blue-600">
                          Season {result.searchResults.top_result.season} •
                          Episode {result.searchResults.top_result.episode}
                        </p>
                        <p className="text-xs text-blue-500">
                          Timecode: {result.searchResults.top_result.timecode}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-100 px-2 py-1 rounded-full">
                          <span className="text-sm font-medium text-blue-800">
                            {result.searchResults.top_result.similarity.toFixed(
                              1
                            )}
                            % match
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Preview Video */}
                    {result.searchResults.top_result.preview_video && (
                      <div className="mt-3">
                        <p className="text-xs text-blue-600 mb-2">Preview:</p>
                        <video
                          controls
                          className="w-full max-w-md rounded-lg"
                          src={result.searchResults.top_result.preview_video}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Outros Resultados */}
              {result.success &&
                result.searchResults?.all_results &&
                result.searchResults.all_results.length > 1 && (
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Other matches (
                      {result.searchResults.all_results.length - 1} more):
                    </h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {result.searchResults.all_results
                        .slice(1, 4)
                        .map((searchResult, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-xs"
                          >
                            <span className="text-gray-600">
                              {searchResult.anime} S{searchResult.season}E
                              {searchResult.episode}
                            </span>
                            <span className="text-gray-500">
                              {searchResult.similarity.toFixed(1)}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              {/* Error Details */}
              {!result.success && result.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Error:</strong> {result.error.error}
                  </p>
                  {result.error.detail && (
                    <p className="text-xs text-red-600 mt-1">
                      {result.error.detail}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Zona de Drop */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          file && "border-gray-200 bg-gray-50"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">Drop the image here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">
              {file
                ? "Drop a new image to replace"
                : "Drag an image here or click to select"}
            </p>
            <p className="text-sm text-gray-500">
              Support for PNG, JPG, JPEG, GIF, and WebP images
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Max size: {formatBytes(maxFileSize)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
