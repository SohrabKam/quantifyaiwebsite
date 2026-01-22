import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { waitlistSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const submission = await prisma.waitlistSubmission.create({
    data: {
      ...parsed.data,
      source: "EARLY_ACCESS",
    },
  });

  console.log("[waitlist] new submission:", submission.email, submission.company);

  return NextResponse.json({ ok: true });
}
