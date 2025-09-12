interface UserAvatarProps {
  readonly imageUrl: string;
  readonly altText: string;
}

export default function UserAvatar({ imageUrl, altText }: UserAvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
      <img
        src={imageUrl}
        alt={altText}
        className="w-full h-full rounded-full"
      />
    </div>
  );
}
