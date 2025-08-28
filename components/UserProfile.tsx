import { User } from "../api/types/UserField";

export function UserProfile({ user }: { user: User }) {
  return (
    <div>
      <p>닉네임: {user.nickname}</p>
      <p>이메일: {user.email}</p>
      {user.profileImageUrl && (
        <img src={user.profileImageUrl} alt="프로필 이미지" style={{ width: 80, height: 80, borderRadius: 40 }} />
      )}
      <p>직업: {user.job}</p>
      <p>도메인: {user.domain}</p>
    </div>
  );
}
