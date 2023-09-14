// Enables auto import for this export
export { useGetCategories } from "./API/useGetCategories";
export { useGetTables } from "./API/useGetTables";

export function extractFileNameFromUrl(url: string): string | null {
  const segments = url.split("/");
  const lastSegment = segments.pop();
  if (lastSegment) {
    return decodeURIComponent(lastSegment);
  }
  return null;
}
