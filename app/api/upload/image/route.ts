import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    console.log("📤 Upload API called");
    
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

    // Create upload directory path
    const uploadDir = join(process.cwd(), "public", "uploads", "news");
    console.log("📂 Upload directory:", uploadDir);
    
    // Create directory if it doesn't exist
    try {
      if (!existsSync(uploadDir)) {
        console.log("📁 Creating upload directory...");
        await mkdir(uploadDir, { recursive: true });
        console.log("✅ Directory created successfully");
      } else {
        console.log("✅ Directory already exists");
      }
    } catch (mkdirError) {
      console.error("❌ Failed to create directory:", mkdirError);
      return NextResponse.json(
        { message: "Зураг хадгалах хавтас үүсгэх боломжгүй. Серверийн эрх шалгана уу." },
        { status: 500 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const extension = originalName.split(".").pop() || "jpg";
    const filename = `news-${timestamp}-${randomStr}.${extension}`;
    
    console.log("📝 Generated filename:", filename);

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("💾 Buffer created, size:", buffer.length);

    // Write file to upload directory
    const filepath = join(uploadDir, filename);
    console.log("💾 Writing file to:", filepath);
    
    try {
      await writeFile(filepath, buffer);
      console.log("✅ File written successfully");
    } catch (writeError) {
      console.error("❌ Failed to write file:", writeError);
      return NextResponse.json(
        { message: "Зураг хадгалах боломжгүй. Серверийн эрх шалгана уу." },
        { status: 500 }
      );
    }

    // Verify file was written
    if (!existsSync(filepath)) {
      console.error("❌ File not found after writing");
      return NextResponse.json(
        { message: "Зураг хадгалагдсан боловч баталгаажуулах боломжгүй" },
        { status: 500 }
      );
    }

    // Return the public URL
    const imageUrl = `/uploads/news/${filename}`;
    console.log("✅ Upload successful, URL:", imageUrl);

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
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Disable body parsing to handle FormData
export const config = {
  api: {
    bodyParser: false,
  },
};
