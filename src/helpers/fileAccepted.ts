export function fileAccepted(file: File, accept: Record<string, string[]>) {
  const mimeType = file.type;
  const extension = "." + file.name.split(".").pop()?.toLowerCase();

  return Object.entries(accept).some(([acceptedMime, extensions]) => {
    const typeMatches =
      acceptedMime === "image/*"
        ? mimeType.startsWith("image/")
        : mimeType === acceptedMime;

    const extMatches = extensions.includes(extension);

    return typeMatches && extMatches;
  });
}
