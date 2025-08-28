import { User } from "../api/types/UserField";

export function UserProfile({ user }: { user: User }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {user.profileImageUrl && (
        <img src={user.profileImageUrl} alt="프로필 이미지" style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 12 }} />
      )}
      <p style={{ fontWeight: 700, fontSize: 18 }}>{user.nickname}</p>
    </div>
  );
}
