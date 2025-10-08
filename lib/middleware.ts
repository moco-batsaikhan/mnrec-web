import { verifyAccessToken } from "./auth";

export function isValidAccessToken(authHeader?: string) {
  if (!authHeader) return false;
  if (!authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.substring(7);
  try {
    verifyAccessToken(token);
    return true;
  } catch (err) {
    return false;
  }
}
