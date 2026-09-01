export function canViewProfile(
  currentUserId: string,
  profileUserId: string
): boolean {
  return currentUserId === profileUserId;
}