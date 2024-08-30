import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useAddMessageToRecipient } from "../../hooks/useAddRecipients";
import useProfileImages from "../../hooks/useProfileImages";
import { relationshipOptions, fontOptions } from "../../constants/options";
import styled from "styled-components";

const PostMessagePageContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid ${(props) => (props.error ? "#ff0000" : "#ccc")};
  border-radius: 5px;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-bottom: 15px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const DefaultProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#007bff" : "transparent")};
  margin-right: 20px;

  &:hover {
    border-color: #007bff;
  }
`;

const InstructionText = styled.div`
  font-size: 16px;
  font-weight: var(--font-regular);
  color: var(--gray-500);
`;

const ProfileImageOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  justify-items: center;
`;

const ProfileImageOption = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? "#007bff" : "transparent")};

  &:hover {
    border-color: #007bff;
  }
`;

const EditorContainer = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.disabled ? "#ccc" : "#a063f0")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#ccc" : "#8b5dde")};
  }
`;

const PostMessagePage = () => {
  const { id: recipientId } = useParams();
  const [from, setFrom] = useState("");
  const [fromError, setFromError] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [relationship, setRelationship] = useState(relationshipOptions[1]); // 디폴트 "지인"
  const [font, setFont] = useState(fontOptions[0]); // 디폴트 "Noto Sans"
  const [isFormValid, setIsFormValid] = useState(false);
  const profileImages = useProfileImages();
  // 롤링페이퍼 대상에게 전할 메세지 생성 커스텀 훅
  const { addMessage } = useAddMessageToRecipient();
  // 롤링페이퍼 대상에게 전할 메세지 생성 성공 후에 이동할 navigate 훅
  const navigate = useNavigate();

  const TEAM = "9-3";

  useEffect(() => {
    // 폼 유효성 검사
    setIsFormValid(from.trim() !== "" && content.trim() !== "");
  }, [from, content]);

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    if (e.target.value.trim() === "") {
      setFromError(true);
    } else {
      setFromError(false);
    }
  };

  const handleFromBlur = () => {
    if (from.trim() === "") {
      setFromError(true);
    }
  };

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const payload = {
        team: TEAM,
        recipientId: recipientId,
        sender: from,
        profileImageURL: selectedImage || profileImages[0], // 기본 이미지 사용
        relationship,
        content,
        font,
      };
      try {
        // 롤링페이퍼 대상에게 전할 메세지 생성
        const result = await addMessage(recipientId, payload);
        console.log(result);
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
          value={from}
          onChange={handleFromChange}
          onBlur={handleFromBlur}
          error={fromError ? "true" : undefined}
        />
        {fromError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}

        <ProfileImageContainer>
          <DefaultProfileImage
            src={profileImages[0]} // 첫 번째 이미지를 default로 사용
            selected={selectedImage === profileImages[0]}
            onClick={() => handleImageSelect(profileImages[0])}
          />
          <div>
            <InstructionText>프로필 이미지를 선택해주세요!</InstructionText>
            <ProfileImageOptions>
              {profileImages.slice(1).map((imageUrl, index) => (
                <ProfileImageOption
                  key={index + 1} // index 보정
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
          <Editor
            id="editor"
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            init={{
              height: 200,
              menubar: false,
              toolbar: true,
              branding: false,
              statusbar: false,
            }}
            onEditorChange={handleEditorChange}
          />
        </EditorContainer>

        <Label htmlFor="fontSelect">폰트 선택</Label>
        <Select
          id="fontSelect"
          value={font}
          onChange={(e) => setFont(e.target.value)}
        >
          {fontOptions.map((font) => (
            <option key={font} value={font}>
              {font}
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
