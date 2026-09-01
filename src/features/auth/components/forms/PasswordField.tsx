import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function PasswordField({
  value,
  onChange,
}: Props) {
  return (

    <div className="relative">
      <Lock className="absolute left-3 top-3 w-4 text-muted-foreground" />


    <Input

    className="pl-10"
      type="password"
      placeholder="Password"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
    </div>
  );
}