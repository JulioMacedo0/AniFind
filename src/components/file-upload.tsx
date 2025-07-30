"use client";

import { useState, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { File, Upload, X, CheckCircle, Loader2 } from "lucide-react";
import { uploadFile } from "@/app/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
interface FileWithPreview extends File {
  preview: string;
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
}

interface FileUploadProps {
  maxFiles?: number;
  maxFileSize?: number; // in bytes
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export default function FileUpload({
  maxFiles = 5,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
}: FileUploadProps = {}) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<UploadResult[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Check for rejected files (size too large, wrong type, etc.)
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error) => {
            if (error.code === "file-too-large") {
              toast.error(`File "${file.name}" is too large`, {
                description: `Maximum file size is ${formatBytes(
                  maxFileSize
                )}. Your file is ${formatBytes(file.size)}.`,
              });
            } else if (error.code === "file-invalid-type") {
              toast.error(`File "${file.name}" has invalid type`, {
                description:
                  "Only PNG, JPG, JPEG, GIF, and WebP images are supported.",
              });
            } else if (error.code === "too-many-files") {
              toast.error("Too many files selected", {
                description: `You can only upload ${maxFiles} file${
                  maxFiles > 1 ? "s" : ""
                } at a time.`,
              });
            }
          });
        });
      }

      // Check if adding new files would exceed maxFiles limit
      const totalFilesAfterAdd = files.length + acceptedFiles.length;
      if (totalFilesAfterAdd > maxFiles) {
        const allowedCount = maxFiles - files.length;
        if (allowedCount <= 0) {
          toast.error("Maximum files reached", {
            description: `You can only upload ${maxFiles} file${
              maxFiles > 1 ? "s" : ""
            } at a time. Please remove some files first.`,
          });
          return;
        } else {
          toast.warning("Some files were not added", {
            description: `Only ${allowedCount} file${
              allowedCount > 1 ? "s" : ""
            } can be added. You've reached the ${maxFiles} file limit.`,
          });
        }
      }

      // Limit files based on maxFiles prop
      const limitedFiles = acceptedFiles.slice(0, maxFiles - files.length);

      const filesWithPreview = limitedFiles.map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }) as FileWithPreview
      );

      if (filesWithPreview.length > 0) {
        setFiles((prev) => [...prev, ...filesWithPreview]);
        setResults([]); // Clear previous results
        toast.success(
          `${filesWithPreview.length} file${
            filesWithPreview.length > 1 ? "s" : ""
          } added successfully`
        );
      }
    },
    [maxFiles, maxFileSize, files.length]
  );

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((files) => files.filter((file) => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setLoading(true);
    const uploadResults: UploadResult[] = [];

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData);
        uploadResults.push(result);

        // Show success/error toast for each file
        if (result.success) {
          toast.success(`File "${file.name}" uploaded successfully!`);
        } else {
          toast.error(`Failed to upload "${file.name}"`, {
            description: result.message,
          });
        }
      } catch (error) {
        const errorResult = {
          success: false,
          message: `Error uploading ${file.name}: ${error}`,
        };
        uploadResults.push(errorResult);

        toast.error(`Upload failed for "${file.name}"`, {
          description: `Unexpected error occurred: ${error}`,
        });
      }
    }

    setResults(uploadResults);
    setLoading(false);

    // Show summary toast
    const successCount = uploadResults.filter((r) => r.success).length;
    const failureCount = uploadResults.length - successCount;

    if (failureCount === 0) {
      toast.success("All files uploaded successfully!", {
        description: `${successCount} file${
          successCount > 1 ? "s" : ""
        } processed.`,
      });
    } else if (successCount === 0) {
      toast.error("All uploads failed", {
        description: `${failureCount} file${
          failureCount > 1 ? "s" : ""
        } could not be uploaded.`,
      });
    } else {
      toast.warning("Upload completed with some errors", {
        description: `${successCount} succeeded, ${failureCount} failed.`,
      });
    }
  };

  const clearAll = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setResults([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
  });

  const hasSuccessfulUploads = results.some((r) => r.success);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Image Upload</h2>

      {/* Zona de Drop */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400",
          files.length > 0 && "mb-6"
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        {isDragActive ? (
          <p className="text-blue-600">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">Drag images here or click to select</p>
            <p className="text-sm text-gray-500">
              Support for PNG, JPG, JPEG, GIF, and WebP images
            </p>
          </div>
        )}
      </div>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Selected Files ({files.length})
            </h3>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-4 p-3 border rounded-lg"
              >
                {/* Preview/Ícone */}
                <div className="flex-shrink-0">
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <File className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Informações do Arquivo */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {formatBytes(file.size)} • {file.type}
                  </p>
                </div>

                {/* Status do Upload */}
                <div className="flex-shrink-0">
                  {results.length > 0 && results[index] ? (
                    results[index].success ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="text-red-500 text-xs">Error</div>
                    )
                  ) : loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão de Upload */}
          {!hasSuccessfulUploads && (
            <Button
              onClick={handleUpload}
              disabled={loading || files.length === 0}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                `Upload ${files.length} file${files.length > 1 ? "s" : ""}`
              )}
            </Button>
          )}
        </div>
      )}

      {/* Resultados do Upload */}
      {results.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold">Upload Results</h3>
          {results.map((result, index) => (
            <div
              key={index}
              className={cn(
                "p-3 rounded-lg",
                result.success
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              )}
            >
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <X className="w-4 h-4 text-red-500" />
                )}
                <p
                  className={cn(
                    "text-sm",
                    result.success ? "text-green-700" : "text-red-700"
                  )}
                >
                  {result.message}
                </p>
              </div>
              {result.success && result.fileInfo && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>Size: {formatBytes(result.fileInfo.size)}</p>
                  <p>Type: {result.fileInfo.type}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
