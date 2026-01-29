import Link from "next/link";

import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";

export async function AppNav() {
  const session = await getServerAuthSession();

  return (
    <header className="border-b border-border/60 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/app" className="text-lg font-semibold">
            QuantifyAI
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
            <Link href="/app" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/app/upload" className="hover:text-foreground">
              Upload
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Back to site</Link>
          </Button>
          {session ? (
            <UserMenu name={session.user?.name} email={session.user?.email} />
          ) : null}
        </div>
      </div>
    </header>
  );
}
