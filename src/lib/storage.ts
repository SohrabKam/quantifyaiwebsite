import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type StoredUpload = {
  key: string;
  provider: "r2" | "local";
};

const getS3Client = () => {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    return null;
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

export async function storeUpload(
  fileName: string,
  buffer: Buffer,
  contentType?: string
): Promise<StoredUpload> {
  const s3 = getS3Client();
  const bucket = process.env.R2_BUCKET;
  const key = `uploads/${randomUUID()}-${fileName}`;

  if (s3 && bucket) {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );
    return { key, provider: "r2" };
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, key.replace("uploads/", ""));
  await fs.writeFile(filePath, buffer);
  return { key: filePath, provider: "local" };
}
