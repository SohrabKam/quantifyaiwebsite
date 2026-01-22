import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Gauge,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-[-280px] -z-10 h-[520px] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_65%)]" />
      <div className="container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Badge variant="secondary">BOQ validation for modern estimators</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              Validate BOQs, spot pricing risk, and lock budgets faster.
            </h1>
            <p className="text-lg text-muted-foreground">
              Budgets fail because spreadsheets hide rate gaps and weak links
              between BOQs and cost libraries. (NAME TBD) uploads your BOQ,
              validates rates against your database, flags anomalies, and
              delivers an auditable budget in hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/early-access">
                  Request Early Access <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/app">Try Demo</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Auditable outputs
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                Faster commercial reviews
              </div>
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-primary" />
                Cleaner handoffs
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Product Screenshot
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">
                    BOQ Validation Summary
                  </h3>
                </div>
                <Badge>Live Preview</Badge>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                {[
                  {
                    title: "Missing rates",
                    value: "14 line items",
                    detail: "Requires estimator review",
                  },
                  {
                    title: "Outlier rates",
                    value: "8 anomalies",
                    detail: "Outside median band",
                  },
                  {
                    title: "Top cost drivers",
                    value: "Concrete + Steel",
                    detail: "52% of total budget",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/60 bg-muted/40 p-4"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-primary">{item.value}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/80 bg-background/80 p-4 shadow-soft lg:block">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Budget Confidence
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary">+18%</p>
              <p className="text-xs text-muted-foreground">
                Based on historical variance
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-muted/40 py-14">
        <div className="container grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Built for estimators & QS",
              description:
                "Compare BOQs against your standard rates and vendor libraries in minutes.",
            },
            {
              title: "Traceable, auditable outputs",
              description:
                "Every flag includes context so commercial managers can defend budget decisions.",
            },
            {
              title: "Accelerate bid reviews",
              description:
                "Spot missing rates, duplicates, and scope gaps before handover.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <Badge variant="outline">How it works</Badge>
            <h2 className="text-3xl font-semibold">
              From BOQ upload to auditable budget in four steps.
            </h2>
            <p className="text-sm text-muted-foreground">
              Designed to reduce rework between estimating, procurement, and
              commercial teams.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              {
                icon: FileSearch,
                title: "Upload BOQ",
                description:
                  "Drop in CSV or XLSX and map columns in seconds.",
              },
              {
                icon: ClipboardCheck,
                title: "Validate rates",
                description:
                  "Cross-check against your rates database and history.",
              },
              {
                icon: CheckCircle2,
                title: "Flag anomalies",
                description:
                  "Highlight missing rates and outliers with clear reasoning.",
              },
              {
                icon: Gauge,
                title: "Build budget",
                description:
                  "Generate totals and top cost drivers with audit trails.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
              >
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary">Screenshots</Badge>
              <h2 className="mt-3 text-3xl font-semibold">
                Built for clarity in every review.
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link href="/app">Try Demo</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "BOQ validation dashboard",
              "Outlier analysis & risk flags",
              "Budget summary & cost drivers",
            ].map((title) => (
              <div
                key={title}
                className="flex h-48 flex-col justify-between rounded-2xl border border-dashed border-border/80 bg-muted/30 p-5 text-sm text-muted-foreground"
              >
                <span className="text-xs uppercase tracking-[0.2em]">
                  Screenshot
                </span>
                <span className="text-base font-semibold text-foreground">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Badge variant="outline">Testimonials</Badge>
            <h2 className="text-3xl font-semibold">
              Teams replacing spreadsheet chaos.
            </h2>
            <p className="text-sm text-muted-foreground">
              Placeholder quotes from estimators, QS, and commercial managers.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "“We caught 17 missing rates before tender submission.”",
              "“Finally a BOQ workflow that commercial can trust.”",
              "“Saved two weeks in budget validation on a live project.”",
              "“The audit trail made procurement sign-off painless.”",
            ].map((quote) => (
              <Card key={quote}>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{quote}</p>
                  <div className="text-xs font-semibold text-foreground">
                    Placeholder Name · Contractor
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary/95 py-16 text-primary-foreground">
        <div className="container grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">
              Ready to validate BOQs with confidence?
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Join the early access list to get first access to integrations and
              rate database connectors.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/early-access">Request Early Access</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Talk to us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
