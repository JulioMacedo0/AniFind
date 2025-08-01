import { FileWithPreview } from "@/@types/file";
import { uploadFile } from "@/app/actions";

export const handleFileUpload = async (fileToUpload: FileWithPreview) => {
  const formData = new FormData();
  formData.append("file", fileToUpload);

  const uploadResult = await uploadFile(formData);

  return uploadResult;
};
