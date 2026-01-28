import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";

const sansFont = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serifFont = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuantifyAI | BOQ Validation & Automated Budgeting",
  description:
    "Upload BOQs, validate rates, flag anomalies, and generate auditable budgets fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sansFont.variable} ${serifFont.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
