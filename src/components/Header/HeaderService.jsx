import styled from 'styled-components';
import { EmojiTopBadge } from '../Emoji/EmojiTopBadge';
import { AddEmoji } from '../Emoji/AddEmoji';
const Container = styled.div`
  background-color: white;
  margin-top: 65px;
  display: flex;
  height: 68px;
  justify-content: center;
  height: 68px;
`;

const ServiceWrap = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
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
            <EmojiTopBadge recipient={recipient} />
            <AddEmoji />
          </RecipientInfo>
        </ServiceWrap>
      )}
    </Container>
  );
};
