import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyImageState } from "../shared/EmptyImageState";

interface CoverUploadProps {
  value: string;
  error?: string;
  onChange: (url: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function uploadToCloudinary(file: File): Promise<string> {
  const signatureResponse = await fetch("/api/booking/upload-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "cover" }),
  });

  const signatureData = await signatureResponse.json();

  if (!signatureResponse.ok) {
    throw new Error(signatureData.message || "Unable to authorize image upload.");
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

export function CoverUpload({ value, error, onChange }: CoverUploadProps) {
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
    <div className="space-y-2">
      <div
        className="group relative h-32 w-full cursor-pointer overflow-hidden rounded-xl border border-[var(--border)]"
        onClick={() => {
          if (!uploading) inputRef.current?.click();
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file && !uploading) void handleFile(file);
        }}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Cover" className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <Upload className="h-5 w-5 text-white" />
            </div>
          </>
        ) : (
          <EmptyImageState
            label="Click or drag to upload cover"
            className="h-full w-full"
          />
        )}

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-medium text-white">
            Uploading cover…
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex-1"
        >
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          {uploading ? "Uploading…" : "Upload Cover"}
        </Button>

        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={uploading}
            onClick={() => onChange("")}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
      {uploadError && (
        <p role="alert" className="text-xs text-destructive">
          {uploadError}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
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