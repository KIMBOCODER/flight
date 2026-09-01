import { Button } from "@/components/ui/button";

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

export function AuthSubmitButton({
  loading,
  children,
}: Props) {
  return (
    <Button
      type="submit"
      className="w-full"
      disabled={loading}
    >
      {loading
        ? "Please wait..."
        : children}
    </Button>
  );
}