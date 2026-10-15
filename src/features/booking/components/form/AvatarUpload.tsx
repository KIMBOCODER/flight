
import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getInitials } from "../../utils/getInitials";

interface AvatarUploadProps {
  value: string;
  name: string;
  error?: string;
  onChange: (url: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function uploadToCloudinary(file: File): Promise<string> {
  const signatureResponse = await fetch("/api/booking/upload-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "avatar" }),
  });

  const signatureData = await signatureResponse.json();

  if (!signatureResponse.ok) {
    throw new Error(
      signatureData.message || "Unable to authorize image upload."
    );
  }

  const body = new FormData();
  body.append("file", file);
  body.append("api_key", signatureData.apiKey);
  body.append("timestamp", String(signatureData.timestamp));
  body.append("folder", signatureData.folder);
  body.append("allowed_formats", signatureData.allowedFormats);
  body.append("signature", signatureData.signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    { method: "POST", body }
  );

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || "Cloudinary upload failed.");
  }

  return result.secure_url as string;
}

export function AvatarUpload({
  value,
  name,
  error,
  onChange,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(file: File) {
    setUploadError("");

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadError("Image must be 5 MB or smaller.");
      return;
    }

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Image upload failed."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="group relative h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-[var(--border)]"
        onClick={() => {
          if (!uploading) inputRef.current?.click();
        }}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-5 w-5 text-white" />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--primary)]">
            <span className="text-lg font-semibold text-[var(--primary-foreground)]">
              {getInitials(name)}
            </span>
          </div>
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-xs font-medium text-white">
            Uploading…
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Camera className="mr-1.5 h-3.5 w-3.5" />
          {uploading ? "Uploading…" : "Upload Photo"}
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={uploading}
            onClick={() => onChange("")}
            className="block"
          >
            <X className="mr-1.5 h-3.5 w-3.5" />
            Remove
          </Button>
        )}

        <p className="text-xs text-[var(--muted-foreground)]">
          JPG, PNG or WebP · max 5 MB
        </p>

        {error && <p className="text-xs text-destructive">{error}</p>}

        {uploadError && (
          <p role="alert" className="text-xs text-destructive">
            {uploadError}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </div>
  );
}
