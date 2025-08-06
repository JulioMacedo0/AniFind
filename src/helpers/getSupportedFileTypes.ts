import { ACCEPTED_MIME_TYPES } from "@/constants/defaultValues";

/**
 * Gets the supported file types as a formatted string
 * @returns Comma-separated string of supported file extensions (e.g., "PNG, JPG, JPEG, WEBP")
 */
export function getSupportedFileTypes(): string {
  const acceptedExtensions = Object.values(ACCEPTED_MIME_TYPES).flat();
  return acceptedExtensions
    .map((ext) => ext.replace(".", "").toUpperCase())
    .join(", ");
}

/**
 * Gets the raw accepted file extensions
 * @returns Array of file extensions (e.g., [".png", ".jpg", ".jpeg", ".webp"])
 */
export function getAcceptedExtensions(): string[] {
  return Object.values(ACCEPTED_MIME_TYPES).flat();
}
