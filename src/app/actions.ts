"use server";

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      throw new Error("No file was uploaded");
    }

    console.log("=== FILE RECEIVED ===");
    console.log("Name:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", file.size, "bytes");
    console.log("Last Modified:", new Date(file.lastModified));

    return {
      success: true,
      message: `File "${file.name}" uploaded successfully!`,
      fileInfo: {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      },
    };
  } catch (error) {
    console.error("Upload error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
