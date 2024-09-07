import useSWR from "swr";
import { useEffect } from "react";
import { getBackgroundImages } from "../api/backgroundImages";
import { getProfileImages } from "../api/profileImages";
import { IMAGE_TYPES } from "../constants/imageTypes";

// 이미지 크기를 줄이고 썸네일로 변환하는 함수
const createThumbnail = async (imageUrl, maxWidth = 300, maxHeight = 300) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // CORS 문제 방지

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

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
      ctx.drawImage(img, 0, 0, width, height);

      // 썸네일을 Base64 데이터 URL로 반환
      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.onerror = (error) => reject(error);

    img.src = imageUrl;
  });
};

// fetcher 함수로 이미지 데이터를 가져와 썸네일을 생성
const fetchThumbnails = async (type) => {
  let imageUrls;
  if (type === IMAGE_TYPES.BACKGROUND) {
    const data = await getBackgroundImages();
    imageUrls = data.imageUrls;
  } else if (type === IMAGE_TYPES.PROFILE) {
    const data = await getProfileImages();
    imageUrls = data.imageUrls;
  } else {
    throw new Error("Unknown image type");
  }

  // 이미지 URL에서 썸네일 생성
  const thumbnails = await Promise.all(
    imageUrls.map((url) => createThumbnail(url))
  );
  return thumbnails; // 썸네일(Base64 데이터 URL)의 배열 반환
};

// LocalStorage에서 데이터를 불러오는 함수
const loadFromLocalStorage = (key) => {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error("Error loading from LocalStorage", error);
    return null;
  }
};

// LocalStorage에 데이터를 저장하는 함수
const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to LocalStorage", error);
  }
};

// SWR을 이용한 썸네일 이미지 생성 및 캐싱 훅
const useThumbnailImages = (type) => {
  const localStorageKey = `${type}Thumbnails`;

  // LocalStorage에서 초기 데이터를 불러옴
  const fallbackData = loadFromLocalStorage(localStorageKey);

  // SWR을 사용하여 썸네일 자체를 캐싱
  const { data: thumbnails, error } = useSWR(
    [type, "thumbnails"],
    () => fetchThumbnails(type),
    {
      fallbackData, // LocalStorage에서 가져온 데이터로 초기화
      revalidateOnFocus: false, // 포커스할 때마다 재검증 비활성화
      refreshInterval: 0, // 자동 갱신 비활성화
    }
  );

  // 최신 데이터를 가져온 경우 LocalStorage에 저장
  useEffect(() => {
    if (thumbnails) {
      saveToLocalStorage(localStorageKey, thumbnails); // LocalStorage에 저장
    }
  }, [thumbnails, localStorageKey]);

  return {
    thumbnails,
    isLoading: !error && !thumbnails, // 로딩 상태
    isError: error, // 에러 상태
  };
};

export default useThumbnailImages;
