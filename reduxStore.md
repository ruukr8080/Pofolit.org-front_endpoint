



// uthApi라는 이름으로 API 슬라이스를 만들고,
// 그걸 Redux 스토어에 연결하는 코드를 짜줄게.
// 이렇게 하면 로그인 상태 관리랑 사용자 정보 가져오는
// API 호출을 한 곳에서 다 처리


// API 요청: axios를 써서 직접 요청 보냄 (api 폴더) -> apiSlicer

// 상태 저장: zustand로 스토어 만듦 (store 폴더) -> 

// 상태 접근: useUserStore 같은 커스텀 훅을 만들어 상태를 가져옴 (hooks 폴더) -> 

// 근데 RTK 쿼리는 이 모든 역할을 하나의 API 슬라이스(src/services/authApi.ts)에서 다 처리해버려.

fetchBaseQuery: axios의 역할을 대신해서 API 요청을 보내.

createApi: API 요청의 로딩, 에러, 데이터를 Redux 스토어에 자동으로 저장해. (zustand의 store 역할)

자동 생성 훅: createApi가 useLoginMutation, useGetMeQuery 같은 훅을 자동으로 만들어줘. (hooks 역할)
                                   // 초기 상태 리듀서 정의
// 객체와 배열을 쉽고 안전하게 업데이트하기
// 가변적인 함수와 명령 피하기

// 리듀서 조합



// "Redux 기초" Part 3: State, Actions, and Reducers
      // 스택 오버플로우: 초기 상태 저장과 combineReducers
      

// 스택 오버플로우: 상태 키 이름과 combineReducers
//  */