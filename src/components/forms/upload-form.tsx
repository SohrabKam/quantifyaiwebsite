"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type UploadState = {
  error?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Run validation"}
    </Button>
  );
}

export function UploadForm({
  action,
}: {
  action: (prevState: UploadState, formData: FormData) => Promise<UploadState>;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <Card>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <label
            htmlFor="file"
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/40 p-6 text-center text-sm text-muted-foreground transition hover:bg-muted/60"
            )}
          >
            <UploadCloud className="h-6 w-6 text-primary" />
            <span className="font-medium text-foreground">
              Upload BOQ file (CSV or XLSX)
            </span>
            <span className="text-xs">
              We’ll parse rows, flag missing rates, and compute budget totals.
            </span>
            <input
              id="file"
              name="file"
              type="file"
              accept=".csv,.xlsx"
              className="hidden"
              required
            />
          </label>
          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
