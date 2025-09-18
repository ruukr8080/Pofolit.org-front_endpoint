import { memo } from "react";
import Image from "next/image";
import { User } from "@/types/user";

interface UserProfileProps {
  user: User;
}

export const UserProfile = memo<UserProfileProps>(({ user }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {user.profileImageUrl && (
        <Image
          src={user.profileImageUrl}
          alt={`${user.nickname} 프로필 이미지`}
          width={80}
          height={80}
          style={{ borderRadius: 40, marginBottom: 12 }}
          priority={false}
          loading="lazy"
        />
      )}
      <p style={{ fontWeight: 700, fontSize: 18 }}>{user.nickname}</p>
      {user.email && (
        <p style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
          {user.email}
        </p>
      )}
    </div>
  );
});

UserProfile.displayName = "UserProfile";
