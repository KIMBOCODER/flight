import { EmptyImageState } from "../shared/EmptyImageState";

interface ProfileCoverProps {
  src: string | null;
}

export function ProfileCover({
  src,
}: ProfileCoverProps) {
  return (
    <div className="h-32 overflow-hidden rounded-t-2xl bg-muted">
      {src ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-muted to-secondary" />
      )}
    </div>
  );
}