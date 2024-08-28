import styled from 'styled-components';

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
  color: ${({ rel }) => (rel === '가족' ? 'var(--green-500)' : rel === '동료' ? 'var(--purple-600)' : rel === '지인' ? 'var(--beige-500)' : 'var(--blue-500)')};
  background-color: ${({ rel }) => (rel === '가족' ? 'var(--green-100)' : rel === '동료' ? 'var(--purple-100)' : rel === '지인' ? 'var(--beige-100)' : 'var(--blue-100)')};
`;

export function PaperCard({ message }) {
  if (!message) return null;

  const { content, createdAt, font, profileImageURL, relationship, name } = message;

  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
    <Container>
      <ProfileWrap>
        <Profile src={profileImageURL} alt="profile image" />
        <Info>
          <Name>
            From.<strong>{name}</strong>
          </Name>
          <RelationShip rel={relationship}>{relationship}</RelationShip>
        </Info>
      </ProfileWrap>
      <Divider />
      <ContentBox font={font}>{content}</ContentBox>
      <CreatedTime>{formattedDate}</CreatedTime>
    </Container>
  );
}
