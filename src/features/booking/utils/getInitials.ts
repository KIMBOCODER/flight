export function getInitials(name: string | null): string {
  if (!name || typeof name !== "string") {
    return "?";
  }
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("")
    .toUpperCase();
}