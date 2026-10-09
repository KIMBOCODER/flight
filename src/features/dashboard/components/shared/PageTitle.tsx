interface PageTitleProps {
  title: string;
  description: string;
}

export function PageTitle({
  title,description,
}: PageTitleProps) {
  return (
    <h2 className="mb-6 text-2xl font-bold">
      {title} {description}
    </h2>
    
  );
}