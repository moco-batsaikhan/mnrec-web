import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  try {
    console.log("📤 Upload API called");
    console.log("🔧 Spaces Config:", {
      endpoint: process.env.SPACES_ENDPOINT,
      region: process.env.SPACES_REGION,
      bucket: process.env.SPACES_BUCKET,
      hasAccessKey: !!process.env.SPACES_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.SPACES_SECRET_ACCESS_KEY,
    });

    // Initialize S3 client inside the function to use latest env variables
    const s3Client = new S3Client({
      endpoint: process.env.SPACES_ENDPOINT,
      region: process.env.SPACES_REGION || "sgp1",
      credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY || "",
      },
    });

    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      console.error("❌ No file in request");
      return NextResponse.json(
        { message: "Зураг файл олдсонгүй" },
        { status: 400 }
      );
    }

    console.log("📁 File received:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      console.error("❌ Invalid file type:", file.type);
      return NextResponse.json(
        { message: "Зөвхөн зураг файл ашиглана уу (JPG, PNG, WebP, GIF)" },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      console.error("❌ File too large:", file.size);
      return NextResponse.json(
        { message: "Зургийн хэмжээ 5MB-аас хэтэрч болохгүй" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const extension = originalName.split(".").pop() || "jpg";
    const filename = `news-${timestamp}-${randomStr}.${extension}`;
    const key = `uploads/news/${filename}`;

    console.log("📝 Generated filename:", filename);
    console.log("🔑 S3 Key:", key);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("💾 Buffer created, size:", buffer.length);

    // Upload to DigitalOcean Spaces
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: "public-read", // Make file publicly accessible
      });

      await s3Client.send(command);
      console.log("✅ File uploaded to Spaces successfully");
    } catch (uploadError) {
      console.error("❌ Failed to upload to Spaces:", uploadError);
      console.error("Upload error details:", {
        message: uploadError instanceof Error ? uploadError.message : "Unknown",
        name: uploadError instanceof Error ? uploadError.name : "Unknown",
        stack: uploadError instanceof Error ? uploadError.stack : "Unknown",
      });
      return NextResponse.json(
        {
          message: "Зураг Spaces руу ачааллахад алдаа гарлаа",
          error:
            uploadError instanceof Error
              ? uploadError.message
              : String(uploadError),
        },
        { status: 500 }
      );
    }

    // Return the CDN URL
    const cdnEndpoint =
      process.env.SPACES_CDN_ENDPOINT || process.env.SPACES_ENDPOINT;
    const imageUrl = `${cdnEndpoint}/${key}`;
    console.log("✅ Upload successful, CDN URL:", imageUrl);

    return NextResponse.json({
      success: true,
      message: "Зураг амжилттай ачааллагдлаа",
      url: imageUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("❌ Image upload error:", error);
    return NextResponse.json(
      {
        message: "Зураг ачааллахад алдаа гарлаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
