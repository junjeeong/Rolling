import styled from "styled-components";
import parse from "html-react-parser";
import { forwardRef } from "react";
import { Profile, Info, Name, RelationShip } from "./PaperCard";
import { fontOptions } from "../../../constants/options";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
  @media (max-width: 1200px) {
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 600px;
  height: 476px;
  padding: 39px 40px;
  border-radius: 16px;
  background-color: var(--white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  // 스크롤이 생기면 스크롤이 생김
  overflow-y: auto;
  // 모바일 사이즈
  @media (max-width: 768px) {
    width: 420px;
    height: 384px;
  }
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  gap: 16px;
`;

const ContentBox = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 256px;
  line-height: 28px;
  font-family: ${({ font }) => font}; /* 폰트 패밀리 적용 */
  font-size: 18px;
  color: var(--gray-500);
  white-space: normal; /* 기본 줄바꿈 설정 */
  overflow: auto; /* 내용이 height을 넘으면 스크롤이 생김 */
  overflow-wrap: break-word; /* 긴 단어도 줄바꿈 */
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 16px;
  border: 1px solid var(--gray-100);
`;

const CreatedTime = styled.div`
  height: 18px;
  font-size: 12px;
  color: var(--gray-400);
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 40px;
  margin-top: 24px;
  padding: 7px 16px;
  border-radius: 6px;
  background-color: var(--purple-500);
  color: var(--white);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

//ModalCard는 함수형 컴포넌트이기 때문에 ref를 전달할 수 없음. forwardRef가 이를 가능하게 해줌.(Container(DOM) -> ModarCard -> ModalCardContainer)
const ModalCard = forwardRef(({ selectedCardInfo, onClose }, ref) => {
  const { sender, profileImageURL, relationship, content, font, createdAt } =
    selectedCardInfo;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  // fontOptions에서 label에 맞는 value를 찾음
  const selectedFont =
    fontOptions.find((option) => option.label === font)?.value ||
    fontOptions[0].value; // 기본값 설정

  return (
    <ModalBackground>
      <Container ref={ref}>
        <ProfileWrap>
          <Profile src={profileImageURL} alt="profile image" />
          <Info>
            <Name>
              From.<strong>{sender}</strong>
            </Name>
            <RelationShip rel={relationship}>{relationship}</RelationShip>
          </Info>
          <CreatedTime>{formattedDate}</CreatedTime>
        </ProfileWrap>
        <Divider />
        <ContentBox font={`var(${selectedFont})`}>{parse(content)}</ContentBox>
        <Button onClick={() => onClose()}>확인</Button>
      </Container>
    </ModalBackground>
  );
});

export default ModalCard;
