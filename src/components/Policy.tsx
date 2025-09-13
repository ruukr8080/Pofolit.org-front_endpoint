"use client";

import { useState } from "react";

// 정책 타입 정의
type PolicyType = "privacy" | "terms";

interface PolicyContentSectionProps {
  readonly sub: string;
  readonly text: string;
}
interface PolicyProps {
  readonly type: PolicyType;
  readonly hovered: PolicyType | null;
  readonly onHover: (type: PolicyType | null) => void;
  readonly onExpand: (type: PolicyType) => void;
}
interface ExpandedBoxProps {
  readonly type: PolicyType;
  readonly onClose: () => void;
}

// 정책 데이터
export const POLICY_CONFIG = {
  privacy: {
    title: "개인정보처리방침",
    text: `
      저희 서비스는 사용자의 개인정보를 매우 중요하게 생각하며,
      정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법규를
      준수하고 있습니다. 본 개인정보처리방침은 서비스 이용에 따라
      제공되는 개인정보가 어떤 목적으로, 어떻게 수집 및 이용되는지를
      명확히 규정하며, 사용자의 권리 보호를 최우선으로 합니다.

      1. 개인정보 수집 및 이용 목적
      - 회원 가입 및 서비스 이용에 따른 본인 식별 및 확인
      - 원활한 서비스 제공 및 운영
      - 이벤트 및 맞춤형 서비스 제공
      - 부정 이용 방지 및 안정적인 서비스 환경 제공

      2. 수집하는 개인정보 항목
      - 필수 정보: 이메일, 닉네임, 비밀번호 (필요 시)
      - 선택 정보: 프로필 이미지, 생년월일, 직업, 도메인 등

      3. 개인정보 보유 및 이용 기간
      - 회원 탈퇴 시 또는 동의 철회 시 즉시 파기합니다.
      - 단, 관련 법령에 따라 보존 의무가 있는 경우, 해당 기간 동안 보관합니다.

      4. 개인정보의 제3자 제공
      - 법령에 규정된 경우를 제외하고는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.

      5. 개인정보 보호를 위한 기술적, 관리적 노력
      - 개인정보 암호화, 보안 프로그램 설치 및 운영, 접근 통제 등 기술적 대책을 마련하고 있습니다.
    `,
  },
  terms: {
    title: "서비스 이용약관",
    text: `
      제 1조 (목적)
      이 약관은 [서비스명]이 제공하는 서비스의 이용과 관련하여
      회원과 회사 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

      제 2조 (약관의 효력 및 변경)
      1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다.
      2. 회사는 '약관의 규제에 관한 법률' 등 관련 법령을 위배하지 않는 범위에서 이 약관을 변경할 수 있으며,
         변경될 경우 서비스에 공지합니다.

      제 3조 (회원가입)
      1. 이용자가 약관에 동의하고, 회사가 정한 양식에 따라 정보를 기입하여
         회원가입을 신청하면, 회사는 이를 승낙함으로써 회원가입이 완료됩니다.
      2. 회원은 가입 시 제공한 정보를 최신 상태로 유지해야 하며,
         정보 변경으로 인한 불이익은 회원이 부담합니다.

      제 4조 (서비스 이용 및 제한)
      1. 회원은 본 약관 및 회사가 정한 운영정책을 준수하며 서비스를 이용해야 합니다.
      2. 회원은 서비스 이용 중 다음과 같은 행위를 해서는 안 됩니다.
         - 타인의 정보를 도용하거나 명의를 허위로 사용하는 행위
         - 음란, 폭력적인 메시지, 이미지, 음성 등을 유포하는 행위
         - 회사의 서비스 운영을 방해하는 행위

      제 5조 (계약 해지 및 서비스 이용 제한)
      1. 회원은 언제든지 서비스 이용을 해지할 수 있으며, 회사는 즉시 회원 탈퇴를 처리합니다.
      2. 회사는 회원이 본 약관을 위반하거나 서비스 운영을 방해하는 경우,
         서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
    `,
  },
};

// 공통으로 사용되는 텍스트 렌더링 컴포넌트
function PolicyContentSection({ sub, text }: PolicyContentSectionProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="font-bold text-xl sm:text-2xl mb-2 text-gray-800">
        {sub}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}

// 정책 박스 (축소된 상태) 컴포넌트
function PolicyBox({ type, hovered, onHover, onExpand }: PolicyProps) {
  const isHovered = hovered === type;
  const isOtherHovered = hovered && hovered !== type;
  const { title, text } = POLICY_CONFIG[type];
  let boxClass = "";
  if (isHovered) {
    boxClass = "scale-105 z-10 shadow-lg ring-4 ring-blue-500";
  } else if (isOtherHovered) {
    boxClass = "scale-95 opacity-60";
  }
  return (
    <button
      type="button"
      className={`relative w-full transition-all duration-300 rounded-xl bg-white shadow-md hover:shadow-xl ${boxClass}`}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(type)}
      onBlur={() => onHover(null)}
      onClick={() => onExpand(type)}
      aria-label={title + " 더 크게 보기"}
    >
      <PolicyContentSection sub={title} text={text.slice(0, 100) + "..."} />
      <span
        className={`absolute right-4 bottom-4 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold shadow transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 pointer-events-none translate-y-4"
        }`}
        aria-hidden="true"
      >
        더 크게 보기
      </span>
    </button>
  );
}

// 확장된 박스 (모달) 컴포넌트

function ExpandedBox({ type, onClose }: ExpandedBoxProps) {
  const { title, text } = POLICY_CONFIG[type];
  // ESC 키 접근성
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <section
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col relative transition-transform duration-500"
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        role="document"
        aria-label={title}
        onKeyDown={handleKeyDown}
      >
        <div className="flex-1 overflow-y-auto">
          <PolicyContentSection sub={title} text={text} />
        </div>
        <div className="sticky bottom-0 bg-white p-4 text-center border-t border-gray-200">
          <button
            className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 text-sm font-semibold shadow transition hover:bg-gray-300"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
}

export default function PolicyPage() {
  const [hovered, setHovered] = useState<PolicyType | null>(null);
  const [expanded, setExpanded] = useState<PolicyType | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col gap-8 transition-all duration-500">
        {!expanded ? (
          <>
            <PolicyBox
              type="privacy"
              hovered={hovered}
              onHover={setHovered}
              onExpand={setExpanded}
            />
            <PolicyBox
              type="terms"
              hovered={hovered}
              onHover={setHovered}
              onExpand={setExpanded}
            />
          </>
        ) : (
          <ExpandedBox
            type={expanded as PolicyType}
            onClose={() => setExpanded(null)}
          />
        )}
      </div>
    </div>
  );
}
