import { useState, useEffect } from "react";
import { getBackgroundImages } from "../api/backgroundImages";

// 배경화면 이미지 목록 커스텀 훅
const useBackgroundImages = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // sessionStorage에서 기존 데이터 가져오기
      const cachedData = sessionStorage.getItem("backgroundImages");

      if (cachedData) {
        // 캐시된 데이터가 있으면 파싱하여 상태에 저장
        setBackgroundImages(JSON.parse(cachedData));
      } else {
        // 캐시된 데이터가 없으면 API 호출하여 데이터 가져오기
        try {
          const responseData = await getBackgroundImages();
          setBackgroundImages(responseData.imageUrls);

          // sessionStorage에 데이터 저장
          sessionStorage.setItem(
            "backgroundImages",
            JSON.stringify(responseData.imageUrls)
          );
        } catch (error) {
          console.error("Failed to fetch background images:", error);
        }
      }
    };

    fetchData();
  }, []);

  return backgroundImages;
};

export default useBackgroundImages;
