import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-20">
      <div className="max-w-3xl space-y-6">
        <Badge variant="secondary">About</Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Built to bring certainty to construction budgeting.
        </h1>
        <p className="text-base text-muted-foreground">
          (NAME TBD) was created to eliminate the costly disconnect between BOQs
          and real-world rate data. We help estimators and commercial managers
          validate scope, detect anomalies, and move faster with confidence.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-lg font-semibold">Mission</h2>
            <p className="text-sm text-muted-foreground">
              Empower commercial teams with transparent budgeting workflows that
              reduce risk, save time, and drive smarter decisions across every
              tender.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-3">
            <h2 className="text-lg font-semibold">Founder story</h2>
            <p className="text-sm text-muted-foreground">
              Placeholder story about building this product after witnessing
              multi-million dollar budget swings caused by spreadsheet drift and
              missing rate visibility.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
