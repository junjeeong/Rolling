import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAddMessageToRecipient } from "../../hooks/useAddRecipients";
import useProfileImages from "../../hooks/useProfileImages";
import { fontOptions, relationshipOptions } from "../../constants/options";
import styled from "styled-components";
import TinyMCEEditor from "../../components/Editor/TinyMCEEditor";

const PostMessagePageContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 720px; /* 태블릿 사이즈 이상일 때 너비를 720px로 설정 */
  }
`;

const Label = styled.label`
  color: var(--gray-900);
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid
    ${(props) => (props.$fromNameError ? "var(--error)" : "var(--gray-300)")};
  border-radius: 5px;
  font-size: 14px;
  width: 100%; /* 부모 컨테이너의 너비에 맞게 설정 */

  @media (min-width: 768px) {
    width: 720px; /* 태블릿 사이즈 이상일 때 너비를 720px로 설정 */
  }
`;

const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 12px;
  margin: 8px 4px 8px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 50px; /* 아래에 50px 간격 */
  border: 1px solid var(--gray-300);
  border-radius: 5px;
  font-size: 14px;
  width: 320px; /* 항상 320px 너비로 설정 */
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin: 50px 0; /* 위아래로 50px 간격 */
`;

const SelectedProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.selected ? "var(--purple-600)" : "transparent")};
  margin-right: 20px;

  &:hover {
    border-color: var(--purple-700);
  }
`;

const InstructionText = styled.div`
  color: var(--gray-500);
  font-size: 16px;
  font-weight: var(--font-regular);
  line-height: 26px;
`;

const ProfileImageOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;

  @media (min-width: 768px) {
    gap: 10px;
    grid-template-columns: repeat(
      10,
      1fr
    ); /* 768px 이상일 때 한 줄에 모든 이미지 표시 */
  }
`;

const ProfileImageOption = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.selected ? "var(--purple-600)" : "transparent")};

  &:hover {
    border-color: var(--purple-700);
  }
`;

const EditorContainer = styled.div`
  margin-bottom: 20px;
  width: 100%; /* 기본적으로 부모 컨테이너의 너비를 사용 */
  margin-bottom: 50px; /* 아래에 50px 간격 */

  @media (min-width: 768px) {
    width: 720px; /* 태블릿 사이즈 이상일 때 너비를 720px로 설정 */
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  background-color: ${(props) =>
    props.disabled ? "var(--gray-300)" : "var(--purple-600)"};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "var(--gray-300)" : "var(--purple-700)"};
  }
`;

const PostMessagePage = () => {
  const { id: recipientId } = useParams();
  const [fromName, setFromName] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [relationship, setRelationship] = useState(relationshipOptions[1]); // 디폴트 "지인"
  const [fontValue, setFontValue] = useState(fontOptions[0].value); // 디폴트 "var(--font-handwritten1)"
  const [isFormValid, setIsFormValid] = useState(false);
  const inputRef = useRef(null); // fromName 이름 입력 필드에 대한 ref
  const [fromNameError, setFromNameError] = useState(false); // fromName 이름 입력값 오류 상태
  // 프로필 이미지 리스트 커스텀 훅
  const profileImages = useProfileImages();
  // 롤링페이퍼 대상에게 전할 메세지 생성 커스텀 훅
  const { addMessage } = useAddMessageToRecipient();
  // 롤링페이퍼 대상에게 전할 메세지 생성 성공 후에 이동할 navigate 훅
  const navigate = useNavigate();

  const TEAM = "9-3";

  useEffect(() => {
    // 폼 유효성 검사
    setIsFormValid(fromName.trim() !== "" && content.trim() !== "");
  }, [fromName, content]);

  useEffect(() => {
    if (profileImages && profileImages.length > 0) {
      setSelectedImage(profileImages[0]); // 디폴트 이미지로 설정
    }
  }, [profileImages]);

  // From 이름 입력 필드 변경 핸들러
  const handleInputChange = () => {
    const value = inputRef.current.value;
    setFromName(value);
    setFromNameError(false);
  };

  // From 이름 입력 필드 포커스 해제 시 처리
  const handleInputBlur = () => {
    const value = inputRef.current.value;
    if (!value.trim()) {
      setFromNameError(true);
    }
  };

  // Editor 내용 변경 핸들러
  const handleEditorChange = (newContent) => {
    setContent(newContent); // 에디터 내용을 상태로 업데이트
  };

  const handleImageSelect = (image) => {
    // 토글 선택: 이미 선택된 이미지일 경우 선택 해제
    if (selectedImage === image) {
      setSelectedImage(profileImages[0]); // 기본 이미지로 되돌리기
    } else {
      setSelectedImage(image); // 클릭된 이미지를 선택된 이미지로 설정
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      // 선택한 폰트 value 에 맞는 label 을 선택
      const selectedFontLabel =
        fontOptions.find((option) => option.value === fontValue)?.label ||
        fontOptions[0].label; // 기본 폰트

      const payload = {
        team: TEAM,
        recipientId: recipientId,
        sender: fromName,
        profileImageURL: selectedImage, // 선택된 이미지 사용
        relationship,
        content,
        font: selectedFontLabel, // 선택된 폰트 사용
      };
      try {
        // 롤링페이퍼 대상에게 전할 메세지 생성
        await addMessage(recipientId, payload);
        // 롤링페이퍼 페이지로 이동
        navigate(`/post/${recipientId}`);
      } catch (error) {
        console.error("Error creating post:", error);
        alert("메세지 생성에 실패했습니다.");
      }
    }
  };

  return (
    <PostMessagePageContainer>
      <FormContainer>
        <Label htmlFor="fromInput">From.</Label>
        <Input
          id="fromInput"
          placeholder="이름을 입력해 주세요."
          ref={inputRef}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          $fromNameError={fromNameError}
        />
        {fromNameError && <ErrorMessage>이름을 입력해 주세요.</ErrorMessage>}

        <ProfileImageContainer>
          <SelectedProfileImage
            src={selectedImage} // 선택된 이미지로 설정
            selected={true} // 항상 선택되도록 설정
            onClick={() => handleImageSelect(profileImages[0])}
          />
          <div>
            <InstructionText>프로필 이미지를 선택해주세요!</InstructionText>
            <ProfileImageOptions>
              {profileImages.slice(1).map((imageUrl, index) => (
                <ProfileImageOption
                  key={`profileImage${index + 1}`} // key 설정
                  src={imageUrl}
                  selected={selectedImage === imageUrl}
                  onClick={() => handleImageSelect(imageUrl)}
                />
              ))}
            </ProfileImageOptions>
          </div>
        </ProfileImageContainer>

        <Label htmlFor="relationshipSelect">상대와의 관계</Label>
        <Select
          id="relationshipSelect"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
        >
          {relationshipOptions.map((relationship) => (
            <option key={relationship} value={relationship}>
              {relationship}
            </option>
          ))}
        </Select>

        <Label htmlFor="editor">내용을 입력해 주세요</Label>
        <EditorContainer>
          <TinyMCEEditor
            value={content} // 에디터에 표시될 내용 (state)
            onEditorChange={handleEditorChange} // 에디터 내용 변경 시 호출될 함수
            font={fontValue}
          />
        </EditorContainer>

        <Label htmlFor="fontSelect">폰트 선택</Label>
        <Select
          id="fontSelect"
          value={fontValue}
          onChange={(e) => setFontValue(e.target.value)}
          style={{ fontFamily: `var(${fontValue})` }} // 폰트 미리보기 적용
        >
          {fontOptions.map(({ label, value }) => (
            <option
              key={label}
              value={value}
              style={{ fontFamily: `var(${value})` }} // 각 옵션의 폰트를 적용
            >
              {label}
            </option>
          ))}
        </Select>

        <Button disabled={!isFormValid} onClick={handleSubmit}>
          생성하기
        </Button>
      </FormContainer>
    </PostMessagePageContainer>
  );
};

export default PostMessagePage;
