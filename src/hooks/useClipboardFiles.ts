import { useEffect } from "react";

import type { FileRejection } from "react-dropzone";

import { fileRejectionHandler } from "@/helpers/fileRejection";
import { ACCEPTED_MIME_TYPES, MAX_FILE_SIZE } from "@/constants/defaultValues";
import { fileAccepted } from "@/helpers/fileAccepted";
import { fileMatchSize } from "@/helpers/fileMatchSize";

export function useClipboardFiles(callback: (file: File) => void) {
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (!e.clipboardData?.files.length) return;

      const file = e.clipboardData.files[0];

      const isAccepted = fileAccepted(file, ACCEPTED_MIME_TYPES);
      const isSizeOk = fileMatchSize(file, MAX_FILE_SIZE);

      if (isAccepted && isSizeOk) {
        callback(file);
        return;
      }

      const errors: Array<FileRejection["errors"][number]> = [];

      if (!isAccepted) {
        errors.push({
          code: "file-invalid-type",
          message: "Invalid file type",
        });
      }

      if (!isSizeOk) {
        errors.push({
          code: "file-too-large",
          message: "File too large",
        });
      }

      fileRejectionHandler([{ file, errors }]);
    };

    window.addEventListener("paste", handler);
    return () => window.removeEventListener("paste", handler);
  }, [callback]);
}
