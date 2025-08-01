import { FileWithPreview } from "@/@types/file";
import { Dispatch, SetStateAction } from "react";

export const fileAcceptedFileHandler = (
  files: File[],
  onSuccess: Dispatch<SetStateAction<FileWithPreview | null>>
) => {
  if (files.length === 0) return;

  const oneFile = files[0];
  if (oneFile) {
    console.log("Accepted file:", oneFile.name);
    const fileWithPreview = Object.assign(oneFile, {
      preview: URL.createObjectURL(oneFile),
    });
    onSuccess(fileWithPreview);
  }
};
