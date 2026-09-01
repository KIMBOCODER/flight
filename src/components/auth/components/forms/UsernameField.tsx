import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function UsernameField({
  value,
  onChange,
}: Props) {
  return (

    <div className="relative">

      <User className="absolute left-3 top-3 h-4 text-muted-foreground" />
    <Input
    className="pl-10"
      placeholder="Username"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />

    </div>
  );
}