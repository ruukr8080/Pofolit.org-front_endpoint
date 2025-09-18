import Image from "next/image";

interface UserAvatarProps {
  readonly imageUrl: string;
  readonly altText: string;
}

export default function UserAvatar({ imageUrl, altText }: UserAvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt={altText}
        width={32}
        height={32}
        className="w-full h-full object-cover rounded-full"
        unoptimized={imageUrl.startsWith("http")} // 외부 이미지의 경우 최적화 비활성화
      />
    </div>
  );
}
