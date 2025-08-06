export function fileMatchSize(file: File, maxSize: number) {
  return file.size <= maxSize;
}
