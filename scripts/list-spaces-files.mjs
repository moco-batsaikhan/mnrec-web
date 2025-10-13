import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "..", ".env.local");
dotenv.config({ path: envPath });

console.log("📦 Listing files in bucket:", process.env.SPACES_BUCKET);

// Initialize S3 client
const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT,
  region: process.env.SPACES_REGION || "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
  },
});

try {
  const command = new ListObjectsV2Command({
    Bucket: process.env.SPACES_BUCKET,
    Prefix: "uploads/news/",
    MaxKeys: 20,
  });

  const response = await s3Client.send(command);

  if (response.Contents && response.Contents.length > 0) {
    console.log(`\n✅ Found ${response.Contents.length} files:\n`);
    response.Contents.forEach((file, index) => {
      console.log(`${index + 1}. ${file.Key}`);
      console.log(`   Size: ${file.Size} bytes`);
      console.log(`   Last Modified: ${file.LastModified}`);
      console.log(
        `   URL: https://${process.env.SPACES_BUCKET}.${process.env.SPACES_REGION}.digitaloceanspaces.com/${file.Key}`
      );
      console.log();
    });
  } else {
    console.log("\n❌ No files found in uploads/news/ directory");
  }
} catch (error) {
  console.error("❌ Failed to list files:", error);
  console.error("Error details:", {
    message: error.message,
    code: error.Code,
  });
}
