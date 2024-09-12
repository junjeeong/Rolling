import React, { useState, useEffect, useCallback } from "react";
import usePostOptionSize from "../../hooks/usePostOptionSize";
import useThumbnailImages from "../../hooks/useThumbnailImages";
import OptionsPresenter from "../../components/Post/OptionsPresenter";
import { IMAGE_TYPES } from "../../constants/imageTypes";
import { COLORS } from "../../constants/colors";

const OptionsContainer = ({ activeTab, onColorSelect, onImageSelect }) => {
  const { thumbnails, isLoading, isError } = useThumbnailImages(
    IMAGE_TYPES.BACKGROUND
  );
  const postOptionSize = usePostOptionSize();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // 탭이 변경될 때마다 선택된 색상과 이미지를 초기화
  useEffect(() => {
    if (activeTab === "color") {
      setSelectedImage(null);
      onImageSelect(null); // 부모 컴포넌트에 상태 초기화 전달
    } else if (activeTab === "image") {
      setSelectedColor(null);
      onColorSelect(null); // 부모 컴포넌트에 상태 초기화 전달
    }
  }, [activeTab, onColorSelect, onImageSelect]);

  // 색상 선택 처리
  const handleColorSelect = useCallback(
    (color) => {
      setSelectedColor(color);
      setSelectedImage(null); // 이미지 선택 초기화
      onColorSelect(color); // 부모 컴포넌트에 선택한 색상 전달
    },
    [onColorSelect] // 의존성 배열에 onColorSelect 포함
  );

  // 이미지 선택 처리
  const handleImageSelect = useCallback(
    (image, index) => {
      setSelectedImage(image);
      setSelectedColor(null); // 색상 선택 초기화
      onImageSelect(image, index); // 부모 컴포넌트에 선택한 이미지와 인덱스 전달
    },
    [onImageSelect] // 의존성 배열에 onImageSelect 포함
  );

  // 로딩 상태 및 에러 상태 처리 (훅 호출 후에 처리)
  if (isLoading) {
    return <div>Loading thumbnails...</div>;
  }

  if (isError) {
    return <div>Error loading thumbnails.</div>;
  }

  return (
    <OptionsPresenter
      activeTab={activeTab}
      colors={COLORS}
      selectedColor={selectedColor}
      onColorSelect={handleColorSelect}
      thumbnails={thumbnails}
      selectedImage={selectedImage}
      onImageSelect={handleImageSelect}
      postOptionSize={postOptionSize}
    />
  );
};

export default OptionsContainer;
