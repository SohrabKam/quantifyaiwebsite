import { EarlyAccessForm } from "@/components/forms/early-access-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function EarlyAccessPage() {
  return (
    <div className="container py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <Badge variant="secondary">Early access</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">
            Request early access to the BOQ validation platform.
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us about your role and biggest budgeting pain. We will share
            onboarding details and demo availability as soon as possible.
          </p>
          <div className="rounded-2xl border border-border/70 bg-muted/40 p-5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">
              What you'll get in early access
            </p>
            <ul className="mt-3 space-y-2">
              <li>Private demo and workflow review</li>
              <li>Custom rate library import support</li>
              <li>Priority input on roadmap</li>
            </ul>
          </div>
        </div>
        <Card>
          <CardContent>
            <EarlyAccessForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
