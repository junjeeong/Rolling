import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 384px;
  height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background-color: var(--white);
`;

export const ProfileWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  gap: 14px;
`;

export const Divider = styled.div`
  float: left;
  width: 336px;
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
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Name = styled.div`
  font-size: 20px;
`;

export const ContentBox = styled.div`
  width: 336px;
  margin: 0 auto;
  font-family: ${({ font }) => font};
  font-size: 18px;
  color: var(--gray-600);
  /* 3줄 넘어가면 ...처리 하기 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 최대 3줄 표시 */
  overflow: hidden;
  text-overflow: ellipsis; /* 넘치는 부분을 ...으로 표시 */
  height: 4.5em; /* 대략 3줄 높이 */
  line-height: 1.5em; /* 줄 높이 설정 */
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
  color: ${({ rel }) => (rel === "가족" ? "var(--green-500)" : rel === "동료" ? "var(--purple-600)" : rel === "지인" ? "var(--beige-500)" : "var(--blue-500)")};
  background-color: ${({ rel }) => (rel === "가족" ? "var(--green-100)" : rel === "동료" ? "var(--purple-100)" : rel === "지인" ? "var(--beige-100)" : "var(--blue-100)")};
`;

export function PaperCard({ recipient }) {
  if (!recipient) return null;
  /* 에러 발생
  변경 전:  const { sender, profileImageURL, relationship, content, font, createdAt } = props;
  에러 발생 이유
  props로 전달되는 객체의 키 이름이 다르기 때문에 비구조화 할당 시에 에러가 발생
  이 방식은 props 객체가 항상 존재하고 필요한 속성을 가지고 있다고 가정합니다. 만약 props가 undefined이거나 createdAt이 undefined인 경우, slice() 메소드를 호출할 때 오류가 발생할 수 있습니다.
  에러 발생
  변경 전: const formattedDate = createdAt.slice(0, 10).replace(/-/g, ".");
  변경 후 되는 이유
  createdAt의 값이 Date 객체가 아니라 문자열이기 때문에 에러가 발생
  Date 객체로 변환한 후 toLocaleDateString() 메서드를 사용하여 날짜 형식으로 변환
  toLocaleDateString() 메서드는 인수를 전달하지 않으면 기본적으로 브라우저의 로캘을 기준으로 날짜를 반환
   2021-09-15T00:00:00.000Z -> 2021. 9. 15
   2021-09-15 -> 2021. 9. 15
   2021-09-15 00:00:00 -> 2021. 9. 15*/
  const { name, backgroundImageURL, backgroundColor, createdAt, messageCount, reactionCount, recentMessages, topReactions } = recipient;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Container>
      <ProfileWrap>
        <Profile src={backgroundImageURL} alt="profile image" />
        <Info>
          <Name>
            From.<strong>{name}</strong>
          </Name>
          <RelationShip rel={backgroundColor}>{backgroundColor}</RelationShip>
        </Info>
      </ProfileWrap>
      <Divider />
      <ContentBox font="Arial">{`Messages: ${messageCount}, Reactions: ${reactionCount}`}</ContentBox>
      <CreatedTime>{formattedDate}</CreatedTime>
    </Container>
  );
}