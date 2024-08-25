import { useState, useEffect } from "react";
import { getProfileImages } from "../api/profileImages";

// 프로필 이미지 목록 커스텀 훅
const useProfileImages = () => {
  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // sessionStorage에서 기존 데이터 가져오기
      const cachedData = sessionStorage.getItem("profileImages");

      if (cachedData) {
        // 캐시된 데이터가 있으면 파싱하여 상태에 저장
        setProfileImages(JSON.parse(cachedData));
      } else {
        // 캐시된 데이터가 없으면 API 호출하여 데이터 가져오기
        try {
          const responseData = await getProfileImages();
          setProfileImages(responseData.imageUrls);

          // sessionStorage에 데이터 저장
          sessionStorage.setItem(
            "profileImages",
            JSON.stringify(responseData.imageUrls)
          );
        } catch (error) {
          console.error("Failed to fetch profile images:", error);
        }
      }
    };

    fetchData();
  }, []);

  return profileImages;
};

export default useProfileImages;
