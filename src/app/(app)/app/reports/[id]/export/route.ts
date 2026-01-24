import { NextRequest, NextResponse } from "next/server";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stringify } from "csv-stringify/sync";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await prisma.report.findUnique({
    where: { id },
    include: { upload: true, rows: true },
  });

  if (!report || report.upload.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const csv = stringify(
    report.rows.map((row) => {
      const data = row.rowJson as Record<string, unknown>;
      const flags = row.flagsJson as Record<string, unknown>;
      return {
        description: data.description ?? "",
        category: data.category ?? "",
        quantity: data.quantity ?? "",
        rate: data.rate ?? "",
        total: data.total ?? "",
        missingRate: flags.missingRate ?? "",
        outlier: flags.outlier ?? "",
        medianRate: flags.medianRate ?? "",
      };
    }),
    { header: true }
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=report-${report.id}.csv`,
    },
  });
}
