import Link from "next/link";

import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";

export async function SiteNav() {
  const session = await getServerAuthSession();

  return (
    <header className="border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            QuantifyAI
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <Link href="/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
            <Link href="/app" className="hover:text-foreground">
              Demo
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link href="/early-access">Request Early Access</Link>
          </Button>
          <Button asChild>
            <Link href={session ? "/app" : "/auth/sign-in"}>
              {session ? "Open App" : "Try Demo"}
            </Link>
          </Button>
          {session ? (
            <div className="hidden sm:block">
              <UserMenu name={session.user?.name} email={session.user?.email} />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
