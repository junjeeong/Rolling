import React, { useState, useEffect, useCallback } from "react";
import usePostOptionSize from "../../hooks/usePostOptionSize";
import useThumbnailImages from "../../hooks/useThumbnailImages";
import OptionsPresenter from "../../components/Post/OptionsPresenter";
import { IMAGE_TYPES } from "../../constants/imageTypes";
import { COLORS } from "../../constants/colors";

const OptionsContainer = ({ activeTab, onColorSelect, onImageSelect }) => {
  const backgroundThumbnails = useThumbnailImages(IMAGE_TYPES.BACKGROUND);
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

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedImage(null); // 이미지 선택 초기화
    onColorSelect(color); // 부모 컴포넌트의 콜백 호출
  };

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setSelectedColor(null); // 색상 선택 초기화
    onImageSelect(image, index); // 부모 컴포넌트의 콜백 호출, 인덱스 함께 전달
  };

  return <OptionsPresenter activeTab={activeTab} colors={COLORS} selectedColor={selectedColor} onColorSelect={handleColorSelect} backgroundThumbnails={backgroundThumbnails} selectedImage={selectedImage} onImageSelect={handleImageSelect} postOptionSize={postOptionSize} />;
};

export default OptionsContainer;
