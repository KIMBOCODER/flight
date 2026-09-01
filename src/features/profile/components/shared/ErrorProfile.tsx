import { AlertCircle } from "lucide-react";

interface ErrorProfileProps {
  message?: string;
}

export function ErrorProfile({
  message = "Unable to load profile.",
}: ErrorProfileProps) {
  return (
    <div className="mx-auto flex min-h-[300px] max-w-3xl items-center justify-center px-4">
      <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-4">
        <AlertCircle
          size={18}
          className="text-destructive"
        />

        <p className="text-sm text-destructive">
          {message}
        </p>
      </div>
    </div>
  );
}