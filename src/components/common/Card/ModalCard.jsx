import styled from "styled-components";
import parse from "html-react-parser";
import { forwardRef } from "react";
import { Profile, Info, Name, RelationShip } from "./PaperCard";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.3);
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
  width: 520px;
  height: 256px;
  line-height: 28px;
  font-family: ${({ font }) => font};
  font-size: 18px;
  color: var(--gray-500);
  white-space: normal; /* 기본 줄바꿈 설정 */
  overflow: auto; /* 내용이 height을 넘으면 스크롤이 생김 */
  overflow-wrap: break-word; /* 긴 단어도 줄바꿈 */
`;
const Divider = styled.div`
  width: 520px;
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
  cursor: pointer;
`;

//ModalCard는 함수형 컴포넌트이기 때문에 ref를 전달할 수 없음. forwardRef가 이를 가능하게 해줌.(Container(DOM) -> ModarCard -> ModalCardContainer)
const ModalCard = forwardRef(({ selectedCardInfo, handleModalOpen }, ref) => {
  const { sender, profileImageURL, relationship, content, font, createdAt } =
    selectedCardInfo;
  const formattedDate = new Date(createdAt).toLocaleDateString();

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
        <ContentBox font={font}>{parse(content)}</ContentBox>
        <Button onClick={() => handleModalOpen(false)}>확인</Button>
      </Container>
    </ModalBackground>
  );
});

export default ModalCard;
