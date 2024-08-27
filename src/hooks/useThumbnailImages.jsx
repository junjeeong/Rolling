import { useState, useEffect } from "react";
import { getBackgroundImages } from "../api/backgroundImages";
import { getProfileImages } from "../api/profileImages";
import { IMAGE_TYPES } from "../constants/imageTypes";

// 이미지 크기를 줄이고 썸네일로 변환하는 함수
const createThumbnail = async (imageUrl, maxWidth = 200, maxHeight = 200) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // CORS 문제를 피하기 위해 crossOrigin 설정
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      // 캔버스 요소 생성
      const canvas = document.createElement("canvas");
      // 2D 컨텍스트 얻기
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // 이미지 비율에 맞춰 크기 조정
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // 이미지를 캔버스에 그리기 (썸네일 생성)
      ctx.drawImage(img, 0, 0, width, height);

      // 생성된 썸네일을 Base64 데이터 URL 형식으로 반환
      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.onerror = (error) => reject(error);

    // 이미지 로드 시작
    img.src = imageUrl;
  });
};

// type에 따라 백그라운드 또는 프로필 이미지로 썸네일을 생성하여 반환하는 커스텀 훅
const useThumbnailImages = (type) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 로컬 스토리지 키 생성
      const localStorageKey = `${type}Thumbnails`;
      // 캐시된 데이터 가져오기
      const cachedData = localStorage.getItem(localStorageKey);

      if (cachedData) {
        // 로컬 스토리지에 데이터가 있으면, 이를 파싱하여 상태에 저장
        setImages(JSON.parse(cachedData));
      } else {
        try {
          let responseData;
          // 타입에 따라 적절한 API 호출
          if (type === IMAGE_TYPES.BACKGROUND) {
            responseData = await getBackgroundImages();
          } else if (type === IMAGE_TYPES.PROFILE) {
            responseData = await getProfileImages();
          } else {
            throw new Error("Unknown image type");
          }

          // 이미지 URL을 썸네일로 변환
          // Promise 배열을 병렬로 실행
          const thumbnails = await Promise.all(
            // 각 이미지 URL에 대해 createThumbnail 함수가 호출되며, 각각의 썸네일 이미지를 생성하는 Promise 배열이 반환
            responseData.imageUrls.map((url) => createThumbnail(url))
          );

          // 상태에 썸네일 저장 및 로컬 스토리지에 캐시
          setImages(thumbnails);
          localStorage.setItem(localStorageKey, JSON.stringify(thumbnails));
        } catch (error) {
          console.error(`Failed to fetch ${type} thumbnails:`, error);
        }
      }
    };

    fetchData();
  }, [type]);

  return images;
};

export default useThumbnailImages;
