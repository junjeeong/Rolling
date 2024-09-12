import { useState, useEffect } from "react";
import { getBackgroundImages } from "../api/backgroundImages"; // axios로 호출하는 함수

const maxRetryCount = 5; // 최대 재시도 횟수 설정

const useBackgroundImages = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [loading, setLoading] = useState(false); // API 호출 중 여부
  const [error, setError] = useState(null); // 에러 상태
  const [retryCount, setRetryCount] = useState(0); // 재시도 횟수 추적

  const fetchBackgroundImages = async () => {
    if (loading || retryCount >= maxRetryCount) return; // 이미 로딩 중이거나 최대 재시도 횟수 초과 시 중단
    setLoading(true); // 로딩 상태 설정

    try {
      const responseData = await getBackgroundImages(); // API 호출
      setBackgroundImages(responseData.imageUrls); // 데이터를 상태로 설정

      // 로컬 스토리지에 데이터를 캐시로 저장
      localStorage.setItem(
        "backgroundImages",
        JSON.stringify(responseData.imageUrls)
      );
      localStorage.setItem("backgroundImagesTime", new Date().getTime()); // 캐시 저장 시간 기록
      setRetryCount(0); // 성공 시 재시도 횟수 초기화
    } catch (error) {
      console.error("Failed to fetch background images:", error);

      if (retryCount < maxRetryCount) {
        console.log(`Retrying... (${retryCount + 1}/${maxRetryCount})`);
        setRetryCount(retryCount + 1); // 재시도 횟수 증가
        const retryDelay = Math.min(60000, 1000 * 2 ** retryCount); // 재시도 지연 시간 계산 (최대 1분)
        setTimeout(fetchBackgroundImages, retryDelay); // 지연 시간 후 재시도
      } else {
        setError("Max retries exceeded. Please try again later."); // 최대 재시도 초과 시 에러 메시지 설정
      }
    } finally {
      setLoading(false); // API 호출 완료 후 로딩 상태 해제
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("backgroundImages");
    const cachedTime = localStorage.getItem("backgroundImagesTime");
    const now = new Date().getTime();

    // 캐시된 데이터가 1시간 내에 유효하면 캐시된 데이터를 사용
    if (cachedData && cachedTime && now - cachedTime < 3600 * 1000) {
      setBackgroundImages(JSON.parse(cachedData));
    } else if (!loading) {
      fetchBackgroundImages(); // API 호출
    }
  }, []); // 첫 마운트에서만 실행

  return { backgroundImages, loading, error };
};

export default useBackgroundImages;
