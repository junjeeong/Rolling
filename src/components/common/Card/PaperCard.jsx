import { TrashCanButtonContainer } from "../../../containers/Post/TrashCanButtonContainer";
import styled from "styled-components";
import parse from "html-react-parser";
import { Toast } from "../Toast";
import { useState } from "react";
import { fontOptions } from "../../../constants/options";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 384px;
  height: 280px;
  padding: 24px 24px;
  border-radius: 16px;
  background-color: var(--white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05) rotateY(10deg); /* 마우스를 올렸을 때 살짝 확대되고 Y축으로 회전 */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* 그림자도 커짐 */
  }

  @media (max-width: 768px) {
    width: 320px;
    height: 230px;
  }
`;
export const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  gap: 14px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: -16px;
  border: 1px solid var(--gray-100);
`;

export const Profile = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

export const Info = styled.div`
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`;

export const Name = styled.div`
  font-size: 20px;
`;

export const ContentBox = styled.div`
  width: 336px;
  margin: 0 auto;
  font-family: ${({ fontFamily }) =>
    fontFamily}; /* 폰트 패밀리를 받는 속성 추가 */
  font-size: 18px;
  color: var(--gray-600);
  /* 3줄 넘어가면 ...처리 하기 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 최대 3줄 표시 */
  overflow-wrap: break-word; /* 긴 단어도 줄바꿈 */
  text-overflow: ellipsis; /* 넘치는 부분을 ...으로 표시 */
  line-height: 1.5em; /* 줄 높이 설정 */
  white-space: normal; /* 텍스트 줄바꿈 허용 */
`;
export const CreatedTime = styled.div`
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: 100%;
  height: 18px;
  font-size: 12px;
  color: var(--gray-400);
`;

export const RelationShip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: fit-content;
  height: 20px;
  font-size: 14px;
  border-radius: 4px;
  padding: 0 8px;
  color: ${({ rel }) =>
    rel === "가족"
      ? "var(--green-500)"
      : rel === "동료"
        ? "var(--purple-600)"
        : rel === "지인"
          ? "var(--beige-500)"
          : "var(--blue-500)"};

  background-color: ${({ rel }) =>
    rel === "가족"
      ? "var(--green-100)"
      : rel === "동료"
        ? "var(--purple-100)"
        : rel === "지인"
          ? "var(--beige-100)"
          : "var(--blue-100)"};
`;

export function PaperCard({ message, isEdit, onClick }) {
  if (!message) return null;
  const [toastVisible, setToastVisible] = useState(false);

  const {
    id,
    sender,
    profileImageURL,
    relationship,
    content,
    font, // 이 값은 fontOptions의 label 값입니다.
    createdAt,
  } = message;

  const formattedDate = new Date(createdAt).toLocaleDateString();
  const handleShowToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 1500);
  };
  return (
    <>
      <Container onClick={onClick}>
        <ProfileWrap>
          <Profile src={profileImageURL} alt="profile image" />
          <Info>
            <Name>
              From.<strong>{sender}</strong>
            </Name>
            <RelationShip rel={relationship}>{relationship}</RelationShip>
          </Info>
          {isEdit && (
            <TrashCanButtonContainer
              seletedCardId={id}
              onShowToast={handleShowToast}
            />
          )}
        </ProfileWrap>
        <Divider />
        <ContentBox fontFamily={`var(${selectedFont})`}>{parse(content)}</ContentBox>
        <CreatedTime>{formattedDate}</CreatedTime>
      </Container>
      {toastVisible && <Toast message="메세지가 성공적으로 삭제되었습니다." />}
    </>
  );
}
