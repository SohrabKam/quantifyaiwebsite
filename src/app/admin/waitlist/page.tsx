import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function WaitlistAdminPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/sign-in");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/app");
  }

  const submissions = await prisma.waitlistSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Waitlist submissions</h1>
          <p className="text-sm text-muted-foreground">
            Early access and contact form submissions.
          </p>
        </div>
        <Button asChild>
          <a href="/admin/waitlist/export">Download CSV</a>
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company size</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  <Badge variant="outline">{submission.source}</Badge>
                </TableCell>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>{submission.company}</TableCell>
                <TableCell>{submission.role}</TableCell>
                <TableCell>{submission.companySize}</TableCell>
                <TableCell>
                  {submission.createdAt.toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
