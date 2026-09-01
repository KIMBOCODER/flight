import { useCurrentUser } from "./useCurrentUser";

export function useAuth() {
  return useCurrentUser();
}