import { AlertCircle } from "lucide-react";
import React from "react";

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({
  label,
  error,
  children,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
      </label>

      {children}

      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}