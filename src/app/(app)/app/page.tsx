import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText, UploadCloud } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AppDashboardPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/sign-in");
  }

  const recentUploads = await prisma.upload.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { report: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="secondary">Dashboard</Badge>
          <h1 className="mt-3 text-2xl font-semibold">
            Welcome back, {session.user.name ?? "Estimator"}.
          </h1>
          <p className="text-sm text-muted-foreground">
            Track recent BOQ validations and generate new reports.
          </p>
        </div>
        <Button asChild>
          <Link href="/app/upload">
            <UploadCloud className="h-4 w-4" />
            Upload BOQ
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.6fr_0.4fr]">
        <Card>
          <CardHeader>
            <CardTitle>BOQ Validation Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Upload a BOQ file to see missing rates, outlier detection, and
              top cost drivers instantly.
            </p>
            <Button asChild variant="outline">
              <Link href="/app/upload">Try demo workflow</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>
              <div className="text-xs uppercase text-muted-foreground">Name</div>
              <div className="font-medium text-foreground">
                {session.user.name ?? "—"}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground">Email</div>
              <div className="font-medium text-foreground">
                {session.user.email}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase text-muted-foreground">Role</div>
              <div className="font-medium text-foreground">
                {session.user.role}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent reports</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/app/upload">New upload</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentUploads.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No uploads yet. Upload a BOQ to generate your first report.
            </div>
          ) : (
            <div className="space-y-3">
              {recentUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border/70 p-4 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium">{upload.fileName}</div>
                      <div className="text-xs text-muted-foreground">
                        Uploaded {upload.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  {upload.report ? (
                    <Button size="sm" asChild>
                      <Link href={`/app/reports/${upload.report.id}`}>
                        View report
                      </Link>
                    </Button>
                  ) : (
                    <Badge variant="outline">Processing</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
