interface Props {
  username: string;
}

export function UserAvatar({
  username,
}: Props) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border">
      {username
        .slice(0, 1)
        .toUpperCase()}
    </div>
  );
}