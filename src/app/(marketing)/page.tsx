import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  FileSpreadsheet,
  Gauge,
  Layers,
  Lock,
  ShieldCheck,
  Users,
  Wand2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const demoScreens = [
  {
    title: "Project setup",
    description: "Capture scope, procurement, and key stakeholders.",
    type: "setup",
  },
  {
    title: "AI processing",
    description: "Parsing scope and building the BOQ structure.",
    type: "processing",
  },
  {
    title: "Generated BOQ",
    description: "NRM2-ready work packages and item codes.",
    type: "boq",
  },
  {
    title: "Review & edit",
    description: "Inline edits, quantities, and specifications.",
    type: "edit",
  },
  {
    title: "Work packages",
    description: "Navigate substructure to services fast.",
    type: "packages",
  },
  {
    title: "Export",
    description: "Excel-first outputs for QS workflows.",
    type: "export",
  },
  {
    title: "Roles & access",
    description: "QS and contractor views with audit trails.",
    type: "roles",
  },
];

const proofLogos = [
  "QS Design Partners",
  "Main Contractor Groups",
  "Cost Consultants",
  "Commercial Managers",
  "Pre-Construction Teams",
];

const clipFrames = [
  {
    title: "Describe your project",
    subtitle: "3-story office, steel frame, London",
    type: "setup",
  },
  {
    title: "AI builds the BOQ",
    subtitle: "NRM2 work packages generated",
    type: "processing",
  },
  {
    title: "Export to Excel",
    subtitle: "Ready for QS review",
    type: "export",
  },
];

const clipFramesReview = [
  {
    title: "Review the BOQ",
    subtitle: "Work packages in NRM2 format",
    type: "boq",
  },
  {
    title: "Edit quantities",
    subtitle: "Inline adjustments with audit trail",
    type: "edit",
  },
  {
    title: "Share with contractor",
    subtitle: "Role-based access & exports",
    type: "roles",
  },
];

function ScreenPreview({ type }: { type: string }) {
  switch (type) {
    case "setup":
      return (
        <div className="space-y-3">
          {[
            "Project name",
            "Client",
            "Location",
            "Building type",
            "Procurement",
          ].map((label) => (
            <div key={label} className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </div>
              <div className="h-8 rounded-md border border-border/70 bg-muted/40" />
            </div>
          ))}
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Scope summary
            </div>
            <div className="h-16 rounded-md border border-border/70 bg-muted/30" />
          </div>
        </div>
      );
    case "processing":
      return (
        <div className="space-y-3">
          {[
            "Parsing scope",
            "Building WBS",
            "NRM2 checks",
            "QA complete",
          ].map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3 rounded-md border border-border/60 bg-muted/40 px-3 py-2"
            >
              <div className="h-2 w-2 rounded-full bg-primary/70" />
              <span className="text-xs text-muted-foreground">{step}</span>
              {index === 3 ? (
                <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-primary">
                  Done
                </span>
              ) : (
                <span className="ml-auto text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Running
                </span>
              )}
            </div>
          ))}
        </div>
      );
    case "boq":
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-[0.6fr_2.2fr_0.6fr_0.9fr_1fr] gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Code</span>
            <span>Description</span>
            <span>Unit</span>
            <span>Qty</span>
            <span>Total</span>
          </div>
          {[
            ["2.1", "Substructure concrete", "m3", "420", "£128,400"],
            ["3.2", "Steel frame", "t", "260", "£214,800"],
            ["5.4", "External glazing", "m2", "98", "£156,100"],
            ["6.3", "Raised access floor", "m2", "1,120", "£89,600"],
          ].map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-[0.6fr_2.2fr_0.6fr_0.9fr_1fr] items-center gap-2 rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs"
            >
              <span className="font-medium text-foreground">{row[0]}</span>
              <span className="text-muted-foreground">{row[1]}</span>
              <span className="text-muted-foreground">{row[2]}</span>
              <span className="text-muted-foreground">{row[3]}</span>
              <span className="font-semibold text-foreground">{row[4]}</span>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-md border border-border/60 bg-background/60 px-3 py-2 text-xs">
            <span className="text-muted-foreground">Total (excl. prelims)</span>
            <span className="font-semibold text-foreground">£1,248,300</span>
          </div>
        </div>
      );
    case "edit":
      return (
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-2">
            {[
              "Internal partitions",
              "Suspended ceilings",
              "Raised access floor",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs"
              >
                <span className="text-muted-foreground">{item}</span>
                <span className="text-foreground">Edit</span>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
            <div className="text-[10px] uppercase tracking-[0.2em]">Quantity</div>
            <div className="mt-2 h-7 rounded-md border border-border/60 bg-background" />
            <div className="mt-3 text-[10px] uppercase tracking-[0.2em]">Spec</div>
            <div className="mt-2 h-12 rounded-md border border-border/60 bg-background" />
          </div>
        </div>
      );
    case "packages":
      return (
        <div className="grid gap-3 md:grid-cols-[0.7fr_1.3fr]">
          <div className="space-y-2">
            {["Substructure", "Superstructure", "Finishes", "Services"].map(
              (pkg) => (
                <div
                  key={pkg}
                  className="rounded-md border border-border/60 bg-muted/40 px-3 py-2 text-xs"
                >
                  {pkg}
                </div>
              )
            )}
          </div>
          <div className="space-y-2">
            {["Ground beams", "Basement slab", "Waterproofing"].map(
              (row) => (
                <div
                  key={row}
                  className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs text-muted-foreground"
                >
                  {row}
                </div>
              )
            )}
          </div>
        </div>
      );
    case "export":
      return (
        <div className="space-y-3">
          <div className="rounded-md border border-border/60 bg-muted/40 p-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Export BOQ</span>
              <span className="text-primary">Excel preferred</span>
            </div>
            <div className="mt-3 grid gap-2">
              <div className="flex items-center justify-between rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-xs">
                <span>Excel (.xlsx)</span>
                <span className="text-primary">Ready</span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border/60 bg-background px-3 py-2 text-xs text-muted-foreground">
                <span>PDF summary</span>
                <span>Optional</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "roles":
      return (
        <div className="grid gap-2 md:grid-cols-2">
          {["QS Lead", "Main Contractor", "Client"].map((role) => (
            <div
              key={role}
              className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-xs"
            >
              <div className="text-foreground">{role}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Access granted
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

function DemoClip({ frames }: { frames: typeof clipFrames }) {
  return (
    <div className="relative h-64 overflow-hidden rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.18),transparent_60%)]" />
      {frames.map((frame, index) => (
        <div
          key={frame.title}
          className="demo-clip-frame absolute inset-0 flex flex-col justify-between p-4"
          style={{ animationDelay: `${index * 3}s` }}
        >
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Demo clip
            </div>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              {frame.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {frame.subtitle}
            </p>
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/30 p-3">
            <ScreenPreview type={frame.type} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/60" />
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
      <div className="absolute inset-x-0 top-[-260px] -z-10 h-[520px] bg-[radial-gradient(circle_at_top,rgba(30,64,175,0.22),transparent_65%)]" />

      <div className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary">AI-generated BOQs for QS teams</Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              A smarter, faster way to build BOQs.
            </h1>
            <p className="text-lg text-muted-foreground">
              QuantifyAI turns your project brief into a structured, professional
              BOQ in minutes. No rigid templates, no manual formatting. Just
              scope, specifications, and quantities—ready for QS review and main
              contractor handoff.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/early-access">
                  Request Early Access <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/app">View Demo</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                NRM2/NRM3 ready
              </div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
                Excel-first exports
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Role-based access
              </div>
            </div>
          </div>
          <div className="relative">
            <PreviewFrame title="Generated BOQ summary">
              <ScreenPreview type="boq" />
              <Separator className="my-4" />
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    title: "Work packages",
                    value: "12 packages",
                    detail: "NRM2 structure",
                  },
                  {
                    title: "Quantity coverage",
                    value: "98%",
                    detail: "Auto-generated",
                  },
                  {
                    title: "QS edits",
                    value: "14 changes",
                    detail: "Audit trail logged",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-border/60 bg-muted/40 p-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{item.title}</span>
                      <span className="text-primary">{item.value}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </PreviewFrame>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/80 bg-background/90 p-4 shadow-soft lg:block">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Time to first BOQ
              </p>
              <p className="mt-2 text-2xl font-semibold text-primary">
                10 minutes
              </p>
              <p className="text-xs text-muted-foreground">
                From brief to structured output
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="border-y border-border/50 bg-muted/20">
        <div className="container py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>Trusted by early design partners</span>
            <div className="flex flex-wrap gap-3">
              {proofLogos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-border/60 bg-background/60 px-3 py-1"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <Badge variant="outline">How it works</Badge>
            <h2 className="text-3xl font-semibold md:text-4xl">
              From brief to BOQ in four steps.
            </h2>
            <p className="text-sm text-muted-foreground">
              Designed for QS and main contractors to move faster with fewer
              manual touchpoints.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              {
                icon: FileSearch,
                title: "Describe your project (2 min)",
                description:
                  "Enter project basics, scope text, and procurement method.",
              },
              {
                icon: Wand2,
                title: "AI processes requirements (30 sec)",
                description:
                  "Identifies components and builds the work breakdown.",
              },
              {
                icon: ClipboardCheck,
                title: "Review & customize (5–10 min)",
                description:
                  "Edit quantities, specs, and add unique items.",
              },
              {
                icon: FileSpreadsheet,
                title: "Export & deliver (1 min)",
                description:
                  "Generate Excel BOQs and share with the team.",
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

      <section className="bg-muted/20 py-20">
        <div className="container space-y-10">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary">Demo gallery</Badge>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                Investor-ready screens, built for QS workflows.
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link href="/app">View Demo</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <PreviewFrame title="BOQ structure with Excel-ready output">
              <ScreenPreview type="boq" />
            </PreviewFrame>
            <div className="grid gap-6">
              {demoScreens.slice(0, 3).map((screen) => (
                <PreviewFrame key={screen.title} title={screen.title}>
                  <p className="mb-3 text-sm text-muted-foreground">
                    {screen.description}
                  </p>
                  <ScreenPreview type={screen.type} />
                </PreviewFrame>
              ))}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {demoScreens.slice(3).map((screen) => (
              <PreviewFrame key={screen.title} title={screen.title}>
                <p className="mb-3 text-sm text-muted-foreground">
                  {screen.description}
                </p>
                <ScreenPreview type={screen.type} />
              </PreviewFrame>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <Badge variant="outline">Core capabilities</Badge>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Built for QS and main contractor teams.
            </h2>
            <p className="text-sm text-muted-foreground">
              Accurate BOQs, consistent standards, and outputs that fit existing
              workflows.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Layers,
                title: "Dynamic BOQ structures",
                description: "Unique structures per project—no rigid templates.",
              },
              {
                icon: CheckCircle2,
                title: "Quality assurance",
                description: "Built-in checks for completeness and compliance.",
              },
              {
                icon: Gauge,
                title: "Comprehensive item lists",
                description: "Never miss components or coordination items.",
              },
              {
                icon: FileSpreadsheet,
                title: "Excel compatibility",
                description: "Rate columns, formulas, and summary sheets.",
              },
              {
                icon: Users,
                title: "Team collaboration",
                description: "Role-based access and contractor sharing.",
              },
              {
                icon: ShieldCheck,
                title: "Secure integration",
                description: "Connect to CostX, WinQS, Candy, or API.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="flex gap-3 pt-6">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Badge variant="secondary">Key benefits</Badge>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Deliver BOQs in hours.
            </h2>
            <p className="text-sm text-muted-foreground">
              Compress timelines while preserving QS quality and auditability.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Traditional BOQ setup",
                value: "2–3 hours → 10 minutes",
              },
              {
                title: "Item identification",
                value: "4+ hours → 1.5 hours",
              },
              {
                title: "Professional formatting",
                value: "2+ hours → 5 minutes",
              },
              {
                title: "Total project time",
                value: "11–17 hours → 4–6 hours",
              },
            ].map((metric) => (
              <div
                key={metric.title}
                className="rounded-2xl border border-border/70 bg-card p-4 shadow-soft"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {metric.title}
                </p>
                <p className="mt-3 text-lg font-semibold text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <Badge variant="outline">Security & access</Badge>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Enterprise-ready controls.
            </h2>
            <p className="text-sm text-muted-foreground">
              Secure data handling, role access, and audit-ready history built in
              from day one.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              {["Role-based access", "Audit trail", "API ready"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border/70 bg-muted/30 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: Lock,
                title: "Secure access",
                description: "Dedicated roles for QS, contractor, and client.",
              },
              {
                icon: ShieldCheck,
                title: "Audit-friendly",
                description: "Track edits, approvals, and export history.",
              },
              {
                icon: FileSpreadsheet,
                title: "Data portability",
                description: "Excel exports align with existing standards.",
              },
              {
                icon: Layers,
                title: "System integration",
                description: "Connect existing rate databases and workflows.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline">Demo clips</Badge>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Short walkthroughs for decks and site embeds.
            </h2>
          </div>
          <Button variant="outline" asChild className="hidden md:inline-flex">
            <Link href="/early-access">Request Early Access</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <DemoClip frames={clipFrames} />
          <DemoClip frames={clipFramesReview} />
        </div>
      </section>

      <section className="bg-primary/95 py-16 text-primary-foreground">
        <div className="container grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold">
              Ready to automate BOQ creation?
            </h2>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Join the early access list to see QuantifyAI in action.
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
