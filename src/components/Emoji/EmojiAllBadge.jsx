import styled from 'styled-components';
import { EmojiBadge } from './EmojiBadge';
const Container = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  display: flex;
  padding: 24px;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
`;
const EmojiBadgeWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  align-items: center;
`;

export const EmojiAllBadge = ({ reactions }) => {
  return (
    <Container>
      <EmojiBadgeWrap>
        {reactions.map((reaction) => (
          <div key={reaction.id}>
            <EmojiBadge emoji={reaction.emoji} count={reaction.count} />
          </div>
        ))}
      </EmojiBadgeWrap>
    </Container>
  );
};
