import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "https://rolling-api.vercel.app", // API 기본 URL 설정
});

let lastRequestTime = 0;
const requestInterval = 2000; // 2초 딜레이
const maxRetryCount = 5; // 최대 재시도 횟수 설정

// 요청 인터셉터 설정
api.interceptors.request.use((config) => {
  const currentTime = new Date().getTime();
  if (currentTime - lastRequestTime < requestInterval) {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          lastRequestTime = new Date().getTime();
          resolve(config);
        },
        requestInterval - (currentTime - lastRequestTime)
      );
    });
  }
  lastRequestTime = currentTime;
  return config;
});

// 응답 인터셉터 설정 (429 에러 대응)
api.interceptors.response.use(
  (response) => response, // 성공적인 응답 처리
  async (error) => {
    const config = error.config;

    // 최초 요청인 경우, retryCount 설정
    if (!config.retryCount) {
      config.retryCount = 0;
    }

    // 429 에러이고, 최대 재시도 횟수보다 적을 때만 재시도
    if (error.response?.status === 429 && config.retryCount < maxRetryCount) {
      config.retryCount += 1; // 재시도 횟수 증가
      const retryDelay = Math.min(60000, 1000 * 2 ** config.retryCount); // 지연 시간 계산 (최대 1분)
      console.log(
        `Retrying after ${retryDelay / 1000} seconds due to 429... (Attempt ${config.retryCount})`
      );

      await new Promise((resolve) => setTimeout(resolve, retryDelay)); // 지연 후 재시도

      return api(config); // 동일한 config로 재시도
    }

    // 재시도 횟수를 초과했거나 429가 아닌 경우, 에러 반환
    if (config.retryCount >= maxRetryCount) {
      console.error("Max retries exceeded. Too many requests.");
    }

    return Promise.reject(error); // 다른 에러는 바로 처리
  }
);

export default api;
