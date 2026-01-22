import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <AppNav />
      <main className="container flex-1 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
