import { useEffect, useState } from "react";
import styled from "styled-components";
import BackgroundOption from "../../components/option/BackgroundOption";
import useOptionSize from "../../hooks/useOptionSize";
import { getBackgroundImages } from "../../api/backgroundImages";

const ToOptionPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("color");
  const [backgroundImages, setBackgroundImages] = useState(null);
  // 옵션 커스텀 훅
  const optionSize = useOptionSize();

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getBackgroundImages();
      setBackgroundImages(responseData.imageUrls);
    };

    fetchData();
  }, []);

  const colors = ["beige", "purple", "blue", "green"];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedImage(null);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setSelectedColor(null);
  };

  const PageContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Header = styled.div`
    width: 100%;
    margin-bottom: 16px;

    @media (min-width: 768px) {
      width: 720px;
      margin-bottom: 24px;
    }
  `;

  const Label = styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  `;

  const Input = styled.input`
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 16px;
  `;

  const Content = styled.div`
    width: 100%;
    max-width: 800px;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      width: 720px;
      margin-bottom: 24px;
    }
  `;

  const Instruction = styled.div`
    color: #181818;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    text-align: left;
  `;

  const SubInstruction = styled.div`
    color: #555;
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 16px;
    text-align: left;
  `;

  const Tabs = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 16px;
  `;

  const Tab = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isActive",
  })`
    flex: 1;
    max-width: 200px;
    text-align: center;
    padding: 12px;
    font-size: 16px;
    cursor: pointer;
    border: 2px solid
      ${({ isActive }) => (isActive ? "#8E44AD" : "transparent")};
    border-radius: 6px;
    color: ${({ isActive }) => (isActive ? "#8E44AD" : "#000")};
  `;

  const OptionsContainer = styled.div`
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

  const GenerateButton = styled.button`
    margin-top: 24px;
    width: 100%;
    padding: 16px;
    background-color: #9935ff;
    color: white;
    font-size: 18px;
    border: none;
    border-radius: 8px;

    @media (min-width: 768px) {
      width: 720px;
      margin-top: 24px;
    }
  `;

  return (
    <PageContainer>
      <Header>
        <Label>To.</Label>
        <Input placeholder="받는 사람 이름을 입력해 주세요" />
      </Header>
      <Content>
        <Instruction>배경화면을 선택해 주세요.</Instruction>
        <SubInstruction>
          컬러를 선택하거나, 이미지를 선택할 수 있습니다.
        </SubInstruction>
        <Tabs>
          <Tab
            isActive={activeTab === "color"}
            onClick={() => setActiveTab("color")}
          >
            컬러
          </Tab>
          <Tab
            isActive={activeTab === "image"}
            onClick={() => setActiveTab("image")}
          >
            이미지
          </Tab>
        </Tabs>
        <OptionsContainer>
          {activeTab === "color" &&
            colors.map((color) => (
              <OptionWrapper
                key={color}
                onClick={() => handleColorSelect(color)}
              >
                <BackgroundOption
                  color={color}
                  size={optionSize}
                  isSelected={color === selectedColor}
                />
              </OptionWrapper>
            ))}
          {activeTab === "image" &&
            backgroundImages.map((image, index) => (
              <OptionWrapper
                key={index}
                onClick={() => handleImageSelect(image)}
              >
                <BackgroundOption
                  color="#fff"
                  size={optionSize}
                  imageUrl={image}
                  isSelected={image === selectedImage}
                />
              </OptionWrapper>
            ))}
        </OptionsContainer>
      </Content>
      <GenerateButton>생성하기</GenerateButton>
    </PageContainer>
  );
};

export default ToOptionPage;
