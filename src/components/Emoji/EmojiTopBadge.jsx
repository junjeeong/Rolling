import styled from "styled-components";
import { EmojiBadge } from "./EmojiBadge";
const Container = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const EmojiBadgeWrap = styled.div`
  display: flex;
  gap: 8px;
`;

// reaction 받은 상위 이모티콘을 시각적으로 표시합니다.
export const EmojiTopBadge = ({ recipient }) => {
  return (
    <Container>
      <EmojiBadgeWrap>
        {recipient.topReactions.map((reaction) => (
          <EmojiBadge key={reaction.id} emoji={reaction.emoji} count={reaction.count} />
        ))}
      </EmojiBadgeWrap>
    </Container>
  );
};
