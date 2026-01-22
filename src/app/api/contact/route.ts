import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const submission = await prisma.waitlistSubmission.create({
    data: {
      source: "CONTACT",
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      role: "Contact",
      companySize: "Unknown",
      painPoint: "General inquiry",
      details: parsed.data.message,
    },
  });

  console.log("[contact] new message:", submission.email, submission.details);

  return NextResponse.json({ ok: true });
}
