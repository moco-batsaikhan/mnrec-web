import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "./database";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-prod";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "15m"; // access token
const REFRESH_EXPIRES_DAYS = parseInt(process.env.JWT_REFRESH_DAYS || "30", 10);

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAccessToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET);
}

export async function createRefreshToken(userId: number) {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: `${REFRESH_EXPIRES_DAYS}d`,
  });

  const expiresAt = new Date(
    Date.now() + REFRESH_EXPIRES_DAYS * 24 * 60 * 60 * 1000
  );
  const conn = await pool.getConnection();
  try {
    await conn.execute(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, expiresAt]
    );
  } finally {
    conn.release();
  }

  return token;
}

export async function revokeRefreshToken(token: string) {
  const conn = await pool.getConnection();
  try {
    await conn.execute(
      "UPDATE refresh_tokens SET revoked = 1 WHERE token = ?",
      [token]
    );
  } finally {
    conn.release();
  }
}

export async function findRefreshToken(token: string) {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.execute(
      "SELECT * FROM refresh_tokens WHERE token = ? AND revoked = 0",
      [token]
    );
    return (rows as any)[0];
  } finally {
    conn.release();
  }
}

/**
 * Get user info from access token cookie
 */
export async function getUserFromRequest(request: Request) {
  try {
    // Try to get token from cookie
    const cookies = request.headers.get("cookie") || "";
    const tokenMatch = cookies.match(/accessToken=([^;]+)/);

    if (!tokenMatch) {
      return null;
    }

    const token = tokenMatch[1];
    const payload = verifyAccessToken(token) as any;

    if (!payload || !payload.userId) {
      return null;
    }

    // Get user from database
    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute(
        "SELECT id, email, name, role, status FROM users WHERE id = ?",
        [payload.userId]
      );
      const user = (rows as any)[0];

      if (!user || user.status !== "active") {
        return null;
      }

      return user;
    } finally {
      conn.release();
    }
  } catch (error) {
    return null;
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: any, requiredRoles: string[]) {
  if (!user || !user.role) {
    return false;
  }
  return requiredRoles.includes(user.role);
}
