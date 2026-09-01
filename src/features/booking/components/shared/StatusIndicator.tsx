interface StatusIndicatorProps {
  active: boolean;
}

export function StatusIndicator({
  active,
}: StatusIndicatorProps) {
  return (
    <div
      className={`w-2.5 h-2.5 rounded-full ${
        active
          ? "bg-green-500"
          : "bg-border"
      }`}
    />
  );
}