import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { AlertTriangle, Download, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/sign-in");
  }

  const report = await prisma.report.findUnique({
    where: { id: params.id },
    include: {
      upload: true,
      rows: true,
    },
  });

  if (!report || report.upload.userId !== session.user.id) {
    notFound();
  }

  const summary = report.summaryJson as {
    totalCost: number;
    missingRatesCount: number;
    outliersCount: number;
    topCostDrivers: Array<{
      description: string;
      total: number;
      rate: number;
      quantity: number;
    }>;
  };

  const rows = report.rows.map((row) => ({
    row: row.rowJson as {
      description: string;
      category: string | null;
      quantity: number;
      rate: number;
      total: number;
    },
    flags: row.flagsJson as {
      missingRate: boolean;
      outlier: boolean;
      medianRate: number;
    },
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="secondary">Report</Badge>
          <h1 className="mt-3 text-2xl font-semibold">
            {report.upload.fileName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Uploaded {report.upload.createdAt.toLocaleDateString()}
          </p>
        </div>
        <Button asChild>
          <Link href={`/app/reports/${report.id}/export`}>
            <Download className="h-4 w-4" />
            Download CSV
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total budget</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            ${summary.totalCost.toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Missing rates</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-destructive">
            {summary.missingRatesCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outliers flagged</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-primary">
            {summary.outliersCount}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top cost drivers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {summary.topCostDrivers.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-5 text-center">
              No cost drivers detected yet.
            </div>
          ) : (
            summary.topCostDrivers.map((driver) => (
              <div
                key={driver.description}
                className="flex items-center justify-between gap-4 rounded-lg border border-border/70 p-3"
              >
                <div>
                  <div className="font-medium text-foreground">
                    {driver.description}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Qty {driver.quantity} · Rate ${driver.rate.toLocaleString()}
                  </div>
                </div>
                <div className="text-base font-semibold text-foreground">
                  ${driver.total.toLocaleString()}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Parsed BOQ rows
          </CardTitle>
          <div className="text-xs text-muted-foreground">
            Showing {rows.length} rows
          </div>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No rows parsed. Please upload a different BOQ file.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Flags</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((item, index) => (
                  <TableRow key={`${item.row.description}-${index}`}>
                    <TableCell className="font-medium">
                      {item.row.description}
                    </TableCell>
                    <TableCell>{item.row.category ?? "—"}</TableCell>
                    <TableCell>{item.row.quantity}</TableCell>
                    <TableCell>${item.row.rate.toLocaleString()}</TableCell>
                    <TableCell>${item.row.total.toLocaleString()}</TableCell>
                    <TableCell>
                      {item.flags.missingRate || item.flags.outlier ? (
                        <div className="flex items-center gap-2 text-xs text-destructive">
                          <AlertTriangle className="h-4 w-4" />
                          {item.flags.missingRate
                            ? "Missing rate"
                            : "Outlier vs median"}
                        </div>
                      ) : (
                        <Badge variant="outline">OK</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
