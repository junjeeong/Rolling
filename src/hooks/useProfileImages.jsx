import { useState, useEffect } from "react";
import { getProfileImages } from "../api/profileImages";

// 프로필 이미지 목록 커스텀 훅
const useProfileImages = () => {
  const [profileImages, setProfileImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getProfileImages();
      setProfileImages(responseData.imageUrls);
    };

    fetchData();
  }, []);

  return profileImages;
};

export default useProfileImages;
