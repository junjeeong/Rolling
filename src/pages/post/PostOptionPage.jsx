import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OptionsContainer from "../../containers/Post/OptionsContainer";
import { useAddRecipient } from "../../hooks/useAddRecipients";
import useBackgroundImages from "../../hooks/useBackgroundImages";
import { COLORS } from "../../constants/colors";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  height: 98px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    width: 720px;
    margin-bottom: 24px;
  }
`;

const Label = styled.div`
  color: var(--gray-900);
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  margin-bottom: 14px;
  letter-spacing: -1px;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  letter-spacing: -1px;
`;

const Input = styled.input.attrs((props) => ({
  hasError: undefined,
}))`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid
    ${({ hasError }) => (hasError ? "var(--error)" : "var(--gray-300)")};
  font-size: 16px;
  outline: ${({ hasError }) => (hasError ? "var(--error)" : "none")};

  &:focus {
    border-color: ${({ hasError }) =>
      hasError ? "var(--error)" : "var(--purple-800)"};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 4px;
`;

const Content = styled.div`
  width: 100%;
  margin-bottom: 24px;

  @media (min-width: 768px) {
    width: 720px;
    margin-bottom: 24px;
  }
`;

const Instruction = styled.div`
  color: var(--gray-900);
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  text-align: left;
  letter-spacing: -1px;
`;

const SubInstruction = styled.div`
  color: var(--gray-500);
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  margin-top: 8px;
  margin-bottom: 16px;
  text-align: left;
  letter-spacing: -1px;
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
  padding: 7px 14px;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid
    ${({ isActive }) => (isActive ? "var(--purple-600)" : "transparent")};
  border-radius: 6px;
  color: ${({ isActive }) =>
    isActive ? "var(--purple-600)" : "var(--gray-900)"};
  background-color: ${({ isActive }) =>
    isActive ? "var(--white)" : "var(--gray-100)"};
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
`;

const GenerateButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 16px;
  background-color: ${({ disabled }) =>
    disabled ? "var(--gray-300)" : "var(--purple-600)"};
  color: var(--white);
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
  // State 선언
  const [selectedColor, setSelectedColor] = useState(null); // 사용자가 선택한 컬러
  const [selectedImage, setSelectedImage] = useState(null); // 사용자가 선택한 이미지
  const [selectedIndex, setSelectedIdex] = useState(0); // 선택한 이미지의 인덱스
  const [activeTab, setActiveTab] = useState("color"); // 현재 활성화된 탭 (color 또는 image)
  const [recipientName, setRecipientName] = useState(""); // 입력된 받는 사람의 이름
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 생성 버튼 활성화 여부
  const [hasError, setHasError] = useState(false); // 입력값 오류 상태
  const inputRef = useRef(null); // 받는 사람 입력 필드에 대한 ref

  // 커스텀 훅을 사용하여 배경 이미지와 추가 로직 가져오기
  const backgroundImages = useBackgroundImages();
  const { addRecipient } = useAddRecipient();
  const navigate = useNavigate();

  const TEAM = "9-3"; // 팀 이름 상수

  // 컬러 선택 핸들러
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (activeTab === "color") {
      setSelectedImage(null); // 컬러 탭이 활성화된 상태에서 컬러를 선택하면 이미지는 초기화
    }
  };

  // 이미지 선택 핸들러
  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setSelectedIdex(index);
    if (activeTab === "image") {
      setSelectedColor(null); // 이미지 탭이 활성화된 상태에서 이미지를 선택하면 컬러는 초기화
    }
  };

  // 생성 버튼 클릭 핸들러
  const handleGenerateClick = async (e) => {
    e.preventDefault();

    if (isButtonEnabled) {
      const payload = {
        team: TEAM,
        name: recipientName,
        backgroundColor: selectedColor || COLORS[0], // 컬러가 선택되지 않았을 경우 기본 컬러를 설정
        backgroundImageURL: selectedImage
          ? backgroundImages[selectedIndex]
          : null, // 이미지가 선택되지 않으면 null
      };

      try {
        const result = await addRecipient(payload); // 서버에 payload 전송
        const id = result.id; // 생성된 롤링페이퍼의 ID
        navigate(`/post/${id}`); // 생성된 롤링페이퍼 페이지로 이동
      } catch (error) {
        console.error("Error creating post:", error);
        alert("롤링 페이퍼 생성에 실패했습니다.");
      }
    }
  };

  // 받는 사람 입력 필드 변경 핸들러
  const handleInputChange = () => {
    const value = inputRef.current.value;
    setRecipientName(value);
    setHasError(false);
  };

  // 입력 필드 포커스 해제 시 처리
  const handleInputBlur = () => {
    if (!recipientName.trim()) {
      setHasError(true);
    }
  };

  useEffect(() => {
    // 받는 사람과 현재 활성화된 탭에 따라 컬러 또는 이미지가 선택되었는지 확인
    const isValid =
      recipientName.trim() &&
      (activeTab === "color" ? selectedColor !== null : selectedImage !== null);

    setIsButtonEnabled(isValid); // 조건에 따라 버튼 활성화
  }, [recipientName, selectedColor, selectedImage, activeTab]);

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
            isActive={activeTab === "color"} // 컬러 탭 활성화 여부
            onClick={() => setActiveTab("color")} // 컬러 탭 클릭 시 활성화
          >
            컬러
          </Tab>
          <Tab
            isActive={activeTab === "image"} // 이미지 탭 활성화 여부
            onClick={() => setActiveTab("image")} // 이미지 탭 클릭 시 활성화
          >
            이미지
          </Tab>
        </Tabs>
        <OptionsContainer
          activeTab={activeTab} // 현재 활성화된 탭에 따라 옵션 표시
          onColorSelect={handleColorSelect} // 컬러 선택 핸들러
          onImageSelect={handleImageSelect} // 이미지 선택 핸들러
        />
      </Content>
      <GenerateButton onClick={handleGenerateClick} disabled={!isButtonEnabled}>
        생성하기
      </GenerateButton>
    </PageContainer>
  );
};

export default PostOptionPage;
