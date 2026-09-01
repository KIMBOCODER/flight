interface SectionHeadingProps {
  title: string;
}

export function SectionHeading({
  title,
}: SectionHeadingProps) {
  return (
    <h3 className="mb-4 text-lg font-semibold">
      {title}
    </h3>
  );
}