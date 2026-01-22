"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const magicLinkSchema = z.object({
  email: z.string().email(),
});

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type MagicLinkValues = z.infer<typeof magicLinkSchema>;
type CredentialsValues = z.infer<typeof credentialsSchema>;

export default function SignInPage() {
  const [status, setStatus] = React.useState<string | null>(null);
  const magicLinkForm = useForm<MagicLinkValues>({
    resolver: zodResolver(magicLinkSchema),
  });
  const credentialsForm = useForm<CredentialsValues>({
    resolver: zodResolver(credentialsSchema),
  });

  const handleMagicLink = async (values: MagicLinkValues) => {
    setStatus(null);
    await signIn("email", {
      email: values.email,
      callbackUrl: "/app",
    });
    setStatus("Magic link sent. Check your email or console log.");
  };

  const handleCredentials = async (values: CredentialsValues) => {
    setStatus(null);
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/app",
    });
    if (result?.error) {
      setStatus("Invalid credentials. Try again.");
      return;
    }
    window.location.href = "/app";
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Magic link sign-in</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={magicLinkForm.handleSubmit(handleMagicLink)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="magic-email">Email</Label>
                <Input
                  id="magic-email"
                  type="email"
                  {...magicLinkForm.register("email")}
                />
                {magicLinkForm.formState.errors.email ? (
                  <p className="text-xs text-destructive">
                    {magicLinkForm.formState.errors.email.message}
                  </p>
                ) : null}
              </div>
              <Button type="submit">Send magic link</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credentials (fallback)</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={credentialsForm.handleSubmit(handleCredentials)}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="cred-email">Email</Label>
                <Input
                  id="cred-email"
                  type="email"
                  {...credentialsForm.register("email")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cred-password">Password</Label>
                <Input
                  id="cred-password"
                  type="password"
                  {...credentialsForm.register("password")}
                />
              </div>
              <Button type="submit" variant="outline">
                Sign in
              </Button>
            </form>
          </CardContent>
        </Card>
        {status ? (
          <p className="text-sm text-muted-foreground md:col-span-2">
            {status}
          </p>
        ) : null}
      </div>
    </div>
  );
}
