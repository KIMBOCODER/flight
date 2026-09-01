import { Check } from "lucide-react";

interface FormActionsProps {
  saved: boolean;
  onSubmit: () => void | Promise<void>;
}

export function FormActions({
  saved,
  onSubmit,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      
      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        className={`flex items-center gap-2 rounded-md px-7 py-2.5 text-sm font-medium transition
          ${
            saved
              ? "bg-green-700 text-white"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }
        `}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4" />
            Saved
          </>
        ) : (
          "Save Profile"
        )}
      </button>

      {/* Cancel Button */}
      <button
        type="button"
        className="rounded-md px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        Cancel
      </button>

    </div>
  );
}