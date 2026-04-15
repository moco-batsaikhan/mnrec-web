export async function register() {
  // Only run migrations on the server (not in the Edge runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { autoMigrate } = await import("./lib/database");
    await autoMigrate();
  }
}
