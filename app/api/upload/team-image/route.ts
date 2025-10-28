import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";

const spacesEndpoint = process.env.SPACES_ENDPOINT;
const spacesRegion = process.env.SPACES_REGION || "sgp1";
const spacesBucket = process.env.SPACES_BUCKET;
const spacesAccessKeyId = process.env.SPACES_ACCESS_KEY_ID;
const spacesSecretAccessKey = process.env.SPACES_SECRET_ACCESS_KEY;
const spacesCdn = process.env.SPACES_CDN_ENDPOINT;

const s3Client = new S3Client({
  endpoint: spacesEndpoint,
  region: spacesRegion,
  credentials: {
    accessKeyId: spacesAccessKeyId!,
    secretAccessKey: spacesSecretAccessKey!,
  },
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("image") as File | null;
  if (!file) {
    return NextResponse.json(
      { success: false, message: "No image uploaded" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop();
  const fileName = `team/team-${Date.now()}-${nanoid(6)}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: spacesBucket,
        Key: fileName,
        Body: buffer,
        ACL: "public-read",
        ContentType: file.type,
      })
    );
    const url = `${spacesCdn}/${fileName}`;
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json(
      { success: false, message: "Image upload failed" },
      { status: 500 }
    );
  }
}
