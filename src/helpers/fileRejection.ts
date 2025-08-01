import { ErrorCode, FileRejection } from "react-dropzone";
import { formatBytes } from "./formatBytes";
import { toast } from "sonner";
import { MAX_FILE_SIZE } from "@/constants/defaultValues";
export const fileRejectionHandler = (files: FileRejection[]) => {
  if (files.length === 0) return true;

  files.forEach(({ file, errors }) => {
    errors.forEach((error) => {
      if (error.code === ErrorCode.FileTooLarge) {
        toast.error(`File "${file.name}" is too large`, {
          description: `Maximum file size is ${formatBytes(
            MAX_FILE_SIZE
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
  return false;
};
