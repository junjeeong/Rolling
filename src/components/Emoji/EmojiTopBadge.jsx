import styled from "styled-components";
import { EmojiBadge } from "./EmojiBadge";
import arrowDown from "../../assets/images/icons/arrow_down.png";
import { useState } from "react";
import { EmojiAllBadge } from "./EmojiAllBadge";
import { useGetReactionsByRecipientId } from "../../hooks/useGetRecipients";
const Container = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const EmojiBadgeWrap = styled.div`
  display: flex;
  gap: 8px;
`;
const ArrowDown = styled.img`
  width: 12px;
  height: 7px;
`;
const ArrowDownBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
// reaction 받은 상위 이모티콘을 시각적으로 표시합니다.
export const EmojiTopBadge = ({ recipient }) => {
  const [showAllBadge, setShowAllBadge] = useState(false);
  const { reactions } = useGetReactionsByRecipientId(recipient.id);

  return (
    <Container>
      <EmojiBadgeWrap>
        {recipient.topReactions.map((reaction) => (
          <EmojiBadge key={reaction.id} emoji={reaction.emoji} count={reaction.count} />
        ))}
      </EmojiBadgeWrap>
      <ArrowDownBtn onClick={() => setShowAllBadge(!showAllBadge)}>
        <ArrowDown src={arrowDown} />
      </ArrowDownBtn>
      {showAllBadge && <EmojiAllBadge reactions={reactions.results} />}
    </Container>
  );
};
