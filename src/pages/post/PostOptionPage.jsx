import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackgroundOption from "../../components/Option/BackgroundOption";
import usePostOptionSize from "../../hooks/usePostOptionSize";
import { useAddRecipient } from "../../hooks/useAddRecipients";
import useBackgroundImages from "../../hooks/useBackgroundImages";

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
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

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const Input = styled.input.attrs((props) => ({
  hasError: undefined,
}))`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
  font-size: 16px;
  outline: ${({ hasError }) => (hasError ? "red" : "none")};

  &:focus {
    border-color: ${({ hasError }) => (hasError ? "red" : "#8E44AD")};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
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
  border: 2px solid ${({ isActive }) => (isActive ? "#8E44AD" : "transparent")};
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
  background-color: ${({ disabled }) => (disabled ? "#CCCCCC" : "#9935ff")};
  color: ${({ disabled }) => (disabled ? "#FFFFFF" : "white")};
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  @media (min-width: 768px) {
    width: 720px;
    margin-top: 24px;
  }
`;

const PostOptionPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("color");
  const [recipientName, setRecipientName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);
  // 옵션 커스텀 훅
  const postOptionSize = usePostOptionSize();
  // 배경화면 이미지 커스텀 훅
  const backgroundImages = useBackgroundImages();
  // 롤링페이퍼 생성 커스텀 훅
  const { addRecipient, data } = useAddRecipient();
  // 롤링페이퍼 생성 성공 후에 이동할 navigate 훅
  const navigate = useNavigate();

  const colors = ["beige", "purple", "blue", "green"];

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedImage(null);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setSelectedColor(colors[0]);
  };

  const handleGenerateClick = async (e) => {
    e.preventDefault();

    if (isButtonEnabled) {
      const payload = {
        team: "9-3",
        name: recipientName,
        backgroundColor: selectedColor,
        backgroundImageURL: selectedImage,
      };

      try {
        // 롤링 페이퍼 생성
        const result = await addRecipient(payload);
        console.log(result);
        // 생성된 ID로 페이지 이동
        const id = result.id;
        navigate(`/post/${id}`);
      } catch (error) {
        console.error("Error creating post:", error);
        alert("롤링 페이퍼 생성에 실패했습니다.");
      }
    }
  };

  const handleInputChange = () => {
    const value = inputRef.current.value;
    setRecipientName(value);
    setHasError(false);
  };

  const handleInputBlur = () => {
    if (!recipientName.trim()) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (recipientName.trim() && (selectedColor || selectedImage)) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [recipientName, selectedColor, selectedImage]);

  return (
    <PageContainer>
      <Header>
        <Label>To.</Label>
        <InputContainer>
          <Input
            placeholder="받는 사람 이름을 입력해 주세요"
            ref={inputRef}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            hasError={hasError}
          />
          {hasError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
        </InputContainer>
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
                  size={postOptionSize}
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
                  size={postOptionSize}
                  imgUrl={image}
                  isSelected={image === selectedImage}
                />
              </OptionWrapper>
            ))}
        </OptionsContainer>
      </Content>
      <GenerateButton onClick={handleGenerateClick} disabled={!isButtonEnabled}>
        생성하기
      </GenerateButton>
    </PageContainer>
  );
};

export default PostOptionPage;
