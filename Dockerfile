ARG NODE_VERSION=22.13.1

FROM node:${NODE_VERSION} AS build
# package.json, package-lock.json 먼저 캐시 레이어에 카피.
# npm ci 라이브러리들을 package-lock.json에 명시 된 버전으로 설치
# 소스 코드를 WORKDIR로 지정한 ./app-client로 복사
WORKDIR /app-client
COPY package*.json ./
RUN npm ci --omit=dev
COPY next.config.ts ./
COPY public ./public
COPY . ./

# Node.js 이미지로 Next.js 빌드하고
# 실행 환경 작업 디렉토리 좌표 찍고
# 빌드 스테이지 캐시 레이어에 넣어둔 소스들을 작업 디렉토리로 복사
RUN npm run build
FROM node:${NODE_VERSION}-slim
WORKDIR /app-client
ENV PATH /app-client/node_modules/.bin:$PATH
COPY --from=build /app-client/app ./app
COPY --from=build /app-client/node_modules ./node_modules
COPY --from=build /app-client/package*.json ./
COPY --from=build /app-client/next.config.ts ./
COPY --from=build /app-client/public ./public
COPY --from=build /app-client/.next ./.next



EXPOSE 3000
CMD ["npm", "run", "start"]
