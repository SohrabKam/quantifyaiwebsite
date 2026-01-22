import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <Badge variant="secondary">Contact</Badge>
          <h1 className="text-4xl font-semibold tracking-tight">
            Talk to the team building the BOQ workflow you need.
          </h1>
          <p className="text-sm text-muted-foreground">
            Tell us about your estimating workflow or upcoming bids. We will
            follow up within one business day.
          </p>
        </div>
        <Card>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
