"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { waitlistSchema } from "@/lib/validation";

type WaitlistFormValues = {
  name: string;
  email: string;
  company: string;
  role: string;
  companySize: string;
  painPoint: string;
  details?: string;
};

const painPoints = [
  "Missing or inconsistent rates",
  "Manual BOQ validation takes too long",
  "Low confidence in budget accuracy",
  "Weak audit trail for commercial review",
  "Hard to compare vendor pricing",
];

export function EarlyAccessForm() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit.");
      }
      reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" {...register("name")} />
          {errors.name ? (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email ? (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} />
          {errors.company ? (
            <p className="text-xs text-destructive">{errors.company.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" {...register("role")} />
          {errors.role ? (
            <p className="text-xs text-destructive">{errors.role.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Company size</Label>
          <Select
            onValueChange={(value) =>
              setValue("companySize", value, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {["1-20", "21-50", "51-200", "201-500", "500+"].map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.companySize ? (
            <p className="text-xs text-destructive">
              {errors.companySize.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label>Biggest pain</Label>
          <Select
            onValueChange={(value) =>
              setValue("painPoint", value, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pain point" />
            </SelectTrigger>
            <SelectContent>
              {painPoints.map((pain) => (
                <SelectItem key={pain} value={pain}>
                  {pain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.painPoint ? (
            <p className="text-xs text-destructive">
              {errors.painPoint.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="details">Anything else?</Label>
        <Textarea
          id="details"
          placeholder="Share context about your BOQ workflows..."
          {...register("details")}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Request Early Access"}
        </Button>
        <span
          className={cn(
            "text-sm",
            status === "success" && "text-primary",
            status === "error" && "text-destructive"
          )}
        >
          {status === "success"
            ? "You're on the list."
            : status === "error"
            ? "Something went wrong. Try again."
            : ""}
        </span>
      </div>
    </form>
  );
}
