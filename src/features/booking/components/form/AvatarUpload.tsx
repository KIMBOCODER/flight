import { useRef } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInitials } from "../../utils/getInitials";

interface AvatarUploadProps {
  value: string;
  name: string;
  error?: string;
  onChange: (url: string) => void;
}

export function AvatarUpload({ value, name, error, onChange }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--border)] cursor-pointer group flex-shrink-0"
        onClick={() => inputRef.current?.click()}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
<img src={value} alt="Avatar" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-[var(--primary)] flex items-center justify-center">
            <span className="text-[var(--primary-foreground)] text-lg font-semibold">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
          <Camera className="w-3.5 h-3.5 mr-1.5" /> Upload Photo
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")} className="block">
            <X className="w-3.5 h-3.5 mr-1.5" /> Remove
          </Button>
        )}
        <p className="text-xs text-[var(--muted-foreground)]">JPG, PNG or GIF · max 5MB</p>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
