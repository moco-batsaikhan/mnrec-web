import { NextResponse } from "next/server";

/**
 * Health check endpoint for DigitalOcean
 * GET /api/health
 */
export async function GET() {
  const healthInfo = {
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || "unknown",
      hasDatabase: !!(
        process.env.DATABASE_HOST &&
        process.env.DATABASE_USER &&
        process.env.DATABASE_NAME
      ),
      hasJwtSecret: !!process.env.JWT_SECRET,
    },
  };

  return NextResponse.json(healthInfo);
}
