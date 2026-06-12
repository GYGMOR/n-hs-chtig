import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;

  // Security: prevent directory traversal by resolving the path
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadsDir, filename);

  // Ensure the resolved path is inside the uploads directory
  if (!filePath.startsWith(uploadsDir)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const fileBuffer = await readFile(filePath);
    
    // Determine content type
    let contentType = "application/octet-stream";
    const ext = path.extname(filename).toLowerCase();
    if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".svg") contentType = "image/svg+xml";

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return new Response("Not Found", { status: 404 });
  }
}
