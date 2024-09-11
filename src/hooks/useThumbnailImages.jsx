import useSWR from "swr";
import { useEffect } from "react";
import { getBackgroundImages } from "../api/backgroundImages";
import { getProfileImages } from "../api/profileImages";
import { IMAGE_TYPES } from "../constants/imageTypes";

// 썸네일 생성 함수 (기존 코드 유지)
const createThumbnail = async (imageUrl, maxWidth = 300, maxHeight = 300) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

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

      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.onerror = (error) => reject(error);

    img.src = imageUrl;
  });
};

// 이미지 URL에서 썸네일을 가져오는 함수
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

  const thumbnails = await Promise.all(
    imageUrls.map((url) => createThumbnail(url))
  );
  return thumbnails;
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

// SWR을 사용한 썸네일 이미지 훅
const useThumbnailImages = (type) => {
  const localStorageKey = `${type}Thumbnails`;

  // LocalStorage에서 초기 데이터를 불러옴
  const fallbackData = loadFromLocalStorage(localStorageKey);

  // SWR을 사용하여 썸네일 데이터를 불러옴
  const { data: thumbnails, error } = useSWR(
    [type, "thumbnails"],
    () => fetchThumbnails(type),
    {
      fallbackData,
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  // thumbnails가 업데이트되었을 때만 LocalStorage에 저장
  useEffect(() => {
    if (thumbnails && thumbnails.length > 0) {
      saveToLocalStorage(localStorageKey, thumbnails); // 데이터를 저장할 때만 실행
    }
  }, [thumbnails, localStorageKey]);

  return {
    thumbnails,
    isLoading: !error && !thumbnails, // 로딩 중인지 확인
    isError: error, // 에러 확인
  };
};

export default useThumbnailImages;
