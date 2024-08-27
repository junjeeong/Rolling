import React from "react";
import styled from "styled-components";
import BackgroundOption from "./BackgroundOption";

const OptionsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  justify-content: center;
  margin-top: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OptionWrapper = styled.div`
  cursor: pointer;
`;

const OptionsPresenter = ({
  activeTab,
  colors,
  selectedColor,
  onColorSelect,
  backgroundThumbnails,
  selectedImage,
  onImageSelect,
  postOptionSize,
}) => {
  const handleColorClick = (color) => {
    if (color !== selectedColor) {
      onColorSelect(color);
    }
  };

  const handleImageClick = (image, index) => {
    if (image !== selectedImage) {
      onImageSelect(image, index); // 이미지와 인덱스를 함께 전달
    }
  };

  return (
    <OptionsGridContainer>
      {activeTab === "color" &&
        colors.map((color) => (
          <OptionWrapper
            key={color}
            onClick={() => handleColorClick(color)} // 색상 선택 시 콜백 호출
          >
            <BackgroundOption
              color={color}
              size={postOptionSize}
              isSelected={color === selectedColor} // 선택된 색상 표시
            />
          </OptionWrapper>
        ))}
      {activeTab === "image" &&
        backgroundThumbnails.map((image, index) => (
          <OptionWrapper
            key={index}
            onClick={() => handleImageClick(image, index)} // 이미지 선택 시 콜백 호출
          >
            <BackgroundOption
              color="#fff"
              size={postOptionSize}
              imgUrl={image}
              isSelected={image === selectedImage} // 선택된 이미지 표시
            />
          </OptionWrapper>
        ))}
    </OptionsGridContainer>
  );
};

export default OptionsPresenter;
