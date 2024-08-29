import styled from "styled-components";
import { Profile, Info, Name, RelationShip, CreatedTime } from "./PaperCard";
import { forwardRef } from "react";

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99px;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 476px;
  padding: 39px 40px;
  border-radius: 16px;
  background-color: var(--white);
`;

const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  height: 116px;
`;

const ContentBox = styled.div`
  margin-top: 16px;
  width: 520px;
  height: 256px;
  line-height: 28px;
  font-family: ${({ font }) => font};
  font-size: 18px;
  overflow: auto;
  color: var(--gray-500);
`;

export const Divider = styled.div`
  width: 520px;
  height: 1px;
  margin-top: -16px;
  border: 1px solid var(--gray-100);
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  margin-top: 24px;
  padding: 7px 16px;
  border-radius: 6px;
  background-color: var(--purple-500);
  color: var(--white);
`;

const ModalCard = forwardRef(({ selectedCardInfo }, ref) => {
  const { sender, profileImageURL, relationship, content, font, createdAt } =
    selectedCardInfo;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
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
      <ContentBox font={font}>{content}</ContentBox>
      <Button>확인</Button>
    </Container>
  );
});

export default ModalCard;
