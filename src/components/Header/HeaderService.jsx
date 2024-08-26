import styled from 'styled-components';
import { EmojiSelector } from '../Emoji/EmojiSelector';
import { EmojiTopBadge } from '../Emoji/EmojiTopBadge';
const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  height: 68px;
  padding: 13px 0;
`;

const ServiceWrap = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 28px;
  color: var(--gray-800);
  font-weight: var(--font-bold);
`;

const RecipientInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
//getReactionsByRecipientId 함수를 사용하여 수신자의 이모지 정보를 가져올 예정

export const HeaderService = ({ recipient }) => {
  return (
    <Container>
      {recipient && (
        <ServiceWrap>
          <p>To: {recipient.name}</p>
          <RecipientInfo>
            <p>이모지 총 개수: {recipient.reactionCount}</p>
            <EmojiTopBadge />
            <EmojiSelector />
          </RecipientInfo>
        </ServiceWrap>
      )}
    </Container>
  );
};
