import { useState, useEffect } from "react";
import { getBackgroundImages } from "../api/backgroundImages";

// 배경화면 이미지 목록 커스텀 훅
const useBackgroundImages = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getBackgroundImages();
      setBackgroundImages(responseData.imageUrls);
    };

    fetchData();
  }, []);

  return backgroundImages;
};

export default useBackgroundImages;
