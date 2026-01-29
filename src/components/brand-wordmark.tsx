import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export function BrandWordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <BrandMark className="h-5 w-5" />
      </span>
      <span className="text-base font-semibold tracking-tight">
        QuantifyAI
      </span>
    </Link>
  );
}
