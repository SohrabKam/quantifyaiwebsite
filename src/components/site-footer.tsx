import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="text-lg font-semibold">(NAME TBD)</div>
          <p className="max-w-sm text-sm text-muted-foreground">
            Construction BOQ validation and automated budgeting for modern
            commercial teams.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link href="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
