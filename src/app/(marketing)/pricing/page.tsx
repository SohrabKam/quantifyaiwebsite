import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    description: "For growing estimating teams validating a handful of BOQs.",
    features: [
      "Up to 10 BOQ uploads per month",
      "Missing rate and outlier detection",
      "Basic budget summary exports",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "$799",
    description: "For mid-sized contractors scaling bid reviews.",
    features: [
      "Unlimited BOQ uploads",
      "Custom rate libraries",
      "Advanced anomaly rules",
      "Multi-project reporting",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large commercial teams with complex workflows.",
    features: [
      "Dedicated onboarding",
      "SSO + advanced permissions",
      "Integration support (ERP + procurement)",
      "Custom audit trails & exports",
      "Enterprise SLAs",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="container py-16 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary">Pricing</Badge>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Plans for every estimating workflow.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Transparent pricing built for contractors, QS teams, and commercial
          managers.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={tier.highlight ? "border-primary shadow-soft" : ""}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {tier.name}
                {tier.highlight ? <Badge>Most popular</Badge> : null}
              </CardTitle>
              <p className="text-3xl font-semibold">{tier.price}</p>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={tier.highlight ? "default" : "outline"}>
                <Link href="/early-access">Request Early Access</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
