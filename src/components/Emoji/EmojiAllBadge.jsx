import styled from "styled-components";
import { EmojiBadge } from "./EmojiBadge";
const Container = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 100px;
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
  // 모바일 사이즈
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
// reaction 받은 전체 이모팀콘을 시각적으로 표시합니다.
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
