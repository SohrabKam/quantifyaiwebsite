import { redirect } from "next/navigation";

import { UploadForm } from "@/components/forms/upload-form";
import { Badge } from "@/components/ui/badge";
import { getServerAuthSession } from "@/lib/auth";
import { uploadBoq } from "./actions";

export default async function UploadPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary">BOQ upload</Badge>
        <h1 className="mt-3 text-2xl font-semibold">
          Upload a BOQ to run validation.
        </h1>
        <p className="text-sm text-muted-foreground">
          We’ll parse the file, detect missing rates, and surface outliers.
        </p>
      </div>
      <UploadForm action={uploadBoq} />
    </div>
  );
}
