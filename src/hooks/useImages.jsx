import { useState, useEffect } from "react";
import { getBackgroundImages, getProfileImages } from "../api/images";
import { IMAGE_TYPES } from "../constants/imageTypes";

// 썸네일 이미지 만들기
const createThumbnail = async (imageUrl, maxWidth = 200, maxHeight = 200) => {
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

// 재사용 가능한 이미지 훅
const useImages = (type) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const localStorageKey = `${type}Images`;
      const cachedData = localStorage.getItem(localStorageKey);

      if (cachedData) {
        setImages(JSON.parse(cachedData));
      } else {
        try {
          let responseData;
          if (type === IMAGE_TYPES.BACKGROUND) {
            responseData = await getBackgroundImages();
          } else if (type === IMAGE_TYPES.PROFILE) {
            responseData = await getProfileImages();
          } else {
            throw new Error("Unknown image type");
          }

          const thumbnails = await Promise.all(
            responseData.imageUrls.map((url) => createThumbnail(url))
          );

          setImages(thumbnails);
          localStorage.setItem(localStorageKey, JSON.stringify(thumbnails));
        } catch (error) {
          console.error(`Failed to fetch ${type} images:`, error);
        }
      }
    };

    fetchData();
  }, [type]);

  return images;
};

export default useImages;
