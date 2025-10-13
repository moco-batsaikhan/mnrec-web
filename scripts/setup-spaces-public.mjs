import { S3Client, PutBucketPolicyCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "..", ".env.local");
dotenv.config({ path: envPath });

console.log("🔧 Setting up Spaces public access...");
console.log("📦 Bucket:", process.env.SPACES_BUCKET);
console.log("🌍 Endpoint:", process.env.SPACES_ENDPOINT);

// Initialize S3 client
const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT,
  region: process.env.SPACES_REGION || "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
  },
});

// Bucket policy to make all files publicly readable
const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${process.env.SPACES_BUCKET}/*`],
    },
  ],
};

try {
  const command = new PutBucketPolicyCommand({
    Bucket: process.env.SPACES_BUCKET,
    Policy: JSON.stringify(policy),
  });

  await s3Client.send(command);
  console.log("✅ Bucket policy updated successfully!");
  console.log("✅ All files in the bucket are now publicly readable");
} catch (error) {
  console.error("❌ Failed to update bucket policy:", error);
  console.error("Error details:", {
    message: error.message,
    code: error.Code,
    statusCode: error.$metadata?.httpStatusCode,
  });

  if (
    error.Code === "NotImplemented" ||
    error.message?.includes("NotImplemented")
  ) {
    console.log(
      "\n⚠️  DigitalOcean Spaces does not support bucket policies via API."
    );
    console.log(
      "📝 Please configure permissions manually in the DigitalOcean dashboard:"
    );
    console.log("   1. Go to: https://cloud.digitalocean.com/spaces");
    console.log("   2. Click on your Space: first-project-space");
    console.log("   3. Settings → File Listing → Enable");
    console.log("   4. Look for 'Permissions' or 'Access Control' settings");
  }

  process.exit(1);
}
