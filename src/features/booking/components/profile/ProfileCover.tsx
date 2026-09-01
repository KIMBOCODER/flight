interface ProfileCoverProps {
  src?: string | null;
}

export function ProfileCover({
  src,
}: ProfileCoverProps) {
  if (!src) {
    return (
      <div className="h-32 bg-gradient-to-br from-muted to-secondary" />
    );
  }

  return (
    <div className="h-32 overflow-hidden">
      <img
        src={src}
        alt="Cover"
        className="w-full h-full object-cover"
      />
    </div>
  );
}