"use server";

import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseBoqFile, uploadSchema, validateBoqRows } from "@/lib/boq";
import { storeUpload } from "@/lib/storage";

type UploadState = {
  error?: string;
};

export async function uploadBoq(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  const session = await getServerAuthSession();
  if (!session) {
    return { error: "You must be signed in to upload." };
  }

  const file = formData.get("file");
  const parsed = uploadSchema.safeParse({ file });
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid file." };
  }

  const buffer = Buffer.from(await parsed.data.file.arrayBuffer());
  const fileName = parsed.data.file.name;
  const fileType = fileName.split(".").pop() ?? "unknown";
  const stored = await storeUpload(
    fileName,
    buffer,
    parsed.data.file.type || "application/octet-stream"
  );

  const upload = await prisma.upload.create({
    data: {
      fileName,
      fileType,
      path: stored.key,
      userId: session.user.id,
    },
  });

  const rows = await parseBoqFile(fileName, buffer);
  const validation = validateBoqRows(rows);

  const report = await prisma.report.create({
    data: {
      uploadId: upload.id,
      summaryJson: validation.summary as unknown as object,
      rows: {
        create: validation.rows.map((item) => ({
          rowJson: JSON.parse(JSON.stringify(item.row)) as object,
          flagsJson: item.flags as unknown as object,
        })),
      },
    },
  });

  redirect(`/app/reports/${report.id}`);
}
