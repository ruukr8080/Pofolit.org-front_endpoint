"use client";

export interface SocialLoginButtonProps {
  provider: "google" | "kakao";
  label: string;
  icon: React.ElementType;
  redirectUrl: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  label,
  icon: Icon,
  redirectUrl,
}) => {
  const handleClick = () => {
    window.location.href = redirectUrl;
  };

  const baseClasses =
    "w-full flex items-center justify-center p-3 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md";
  const googleClasses = "bg-white text-gray-700 border border-gray-300";
  const kakaoClasses = "bg-[#FEE500] text-[#3c1e1e]";
  const iconClasses = "mr-3";

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${
        provider === "google" ? googleClasses : kakaoClasses
      }`}
    >
      <Icon className={iconClasses} />
      <span>{label}</span>
    </button>
  );
};

export default SocialLoginButton;
