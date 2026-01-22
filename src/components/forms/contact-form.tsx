"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type ContactFormValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function ContactForm() {
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
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
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input id="company" {...register("company")} />
        {errors.company ? (
          <p className="text-xs text-destructive">{errors.company.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" {...register("message")} />
        {errors.message ? (
          <p className="text-xs text-destructive">{errors.message.message}</p>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send message"}
        </Button>
        <span
          className={cn(
            "text-sm",
            status === "success" && "text-primary",
            status === "error" && "text-destructive"
          )}
        >
          {status === "success"
            ? "Thanks! We will be in touch."
            : status === "error"
            ? "Something went wrong. Try again."
            : ""}
        </span>
      </div>
    </form>
  );
}
