import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email."),
  company: z.string().min(2, "Company is required."),
  message: z.string().min(10, "Tell us a little more."),
});

export const waitlistSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Enter a valid email."),
  company: z.string().min(2, "Company is required."),
  role: z.string().min(2, "Role is required."),
  companySize: z.string().min(1, "Company size is required."),
  painPoint: z.string().min(1, "Select a pain point."),
  details: z.string().optional(),
});

export const uploadSchema = z.object({
  uploadId: z.string().cuid(),
});
