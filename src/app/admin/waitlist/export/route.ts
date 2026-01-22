import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stringify } from "csv-stringify/sync";

export async function GET() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await prisma.waitlistSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const csv = stringify(
    submissions.map((submission) => ({
      id: submission.id,
      source: submission.source,
      name: submission.name,
      email: submission.email,
      company: submission.company,
      role: submission.role,
      companySize: submission.companySize,
      painPoint: submission.painPoint,
      details: submission.details ?? "",
      createdAt: submission.createdAt.toISOString(),
    })),
    { header: true }
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=waitlist.csv",
    },
  });
}
