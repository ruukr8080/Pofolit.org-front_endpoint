import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/api/type/userType';


// `refreshToken`을 제외한 안전한 유저 정보 타입
// 이 타입의 데이터만 스토어에 저장하고 localStorage에 영속화합니다.
type SafeUser = Omit<User, 'refreshToken'>;

// 스토어 상태 타입
// 백엔드 User 인터페이스를 활용해 'user' 속성을 정의
interface UserState {
  isLoggedIn: boolean;
  user: SafeUser | null;
}

// 스토어 액션 타입
interface UserActions {
  // login 액션의 payload 타입을 백엔드에서 정의한 User 타입으로 설정
  login: (user: User) => void;
  logout: () => void;
  // 닉네임 업데이트 액션의 payload 타입도 명확히 지정
  updateNickname: (nickname: string) => void;
}

// 3. 스토어 전체 타입: 상태 + 액션

type UserStore = UserState & UserActions;

// `devtools` 상태관리 추적용 미들웨어. 크롬 익스텐션 `Redux DevTools `
// `persist`,`createJSONStorage`를 통해 'refreshToken' 제외하고 로컬스토리지에 스토어상태 박습니다.
export const useUserStore = create<UserStore>()(
  persist(
    devtools(
      (set) => ({
        isLoggedIn: false,
        user: null,
        // 액션 (상태 변경 로직)
        login: (user) => {
          // 을 제외한 유저 정보만 추출해서 스토어에 저장합니다.
          const { refreshToken, ...safeUser } = user;
          set({
            user: safeUser,
            isLoggedIn: true,
          });
        },

        logout: () => set({
          isLoggedIn: false,
          user: null,
        }),

        updateNickname: (nickname) => set((state) => {
          if (state.user) {
            return {
              ...state,
              user: {
                ...state.user,
                nickname: nickname,
              },
            };
          }
          return state;
        }),
      }), { name: 'User-Store' }
    ),
    {
      name: 'user-storage', // localStorage에 저장될 키
      storage: createJSONStorage(() => localStorage),
      // 'isLoggedIn'과 'user'만 localStorage에 저장하도록 설정
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn, user: state.user }),
    }
  )
);
