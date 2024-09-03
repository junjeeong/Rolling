import styled from "styled-components";
import { EmojiTopBadge } from "../Emoji/EmojiTopBadge";
import { AddEmoji } from "../Emoji/AddEmoji";
import { AuthorNotice } from "./AuthorNotice";
import arrowDown from "../../assets/images/icons/arrow_down.png";
import { useGetReactionsByRecipientId } from "../../hooks/useGetRecipients";
import { EmojiAllBadge } from "../Emoji/EmojiAllBadge";
import { useEffect, useState } from "react";
import ShareDropdown from "../Share/ShareDropdown";
import { useAddReactionToRecipient } from "../../hooks/useAddRecipients";

const Container = styled.div`
  background-color: white;
  margin-top: 65px;
  display: flex;
  height: 68px;
  justify-content: center;
  height: 68px;
`;
const Wrap = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
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

const Divider = styled.div`
  width: 1px;
  height: 28px;
  border: 1px solid var(--gray-200);
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
//getReactionsByRecipientId 함수를 사용하여 수신자의 이모지 정보를 가져올 예정

export const HeaderService = ({ recipient: initialRecipient, messages }) => {
  const [recipient, setRecipient] = useState(initialRecipient);
  const [showAllBadge, setShowAllBadge] = useState(false);
  const { reactions } = useGetReactionsByRecipientId(recipient.id);
  // useGetReactionsByRecipientId 훅을 사용하여 이모지 추가 기능을 구현
  const { addReaction } = useAddReactionToRecipient();

  const handleAddEmoji = async (emoji) => {
    try {
      await addReaction(recipient.id, { emoji: emoji, type: "increase" }); // 선택된 이모지를 서버로 전송
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
  };

  return (
    <Container>
      {recipient && (
        <ServiceWrap>
          <p>To: {recipient.name}</p>
          <Wrap style={{ gap: "28px" }}>
            <Wrap>
              <AuthorNotice paperInfo={recipient} authors={messages} />
              <Divider />
            </Wrap>
            <Wrap>
              {recipient.topReactions.length > 0 && <EmojiTopBadge recipient={recipient} />}
              <Wrap style={{ position: "relative" }}>
                {recipient.topReactions.length > 0 && (
                  <ArrowDownBtn onClick={() => setShowAllBadge(!showAllBadge)}>
                    <ArrowDown src={arrowDown} />
                  </ArrowDownBtn>
                )}
                {showAllBadge && <EmojiAllBadge reactions={reactions.results} />}
                <AddEmoji onAdd={handleAddEmoji} /> {/* AddEmoji에 onAdd 전달 */}
                <Divider />
              </Wrap>
              <ShareDropdown />
            </Wrap>
          </Wrap>
        </ServiceWrap>
      )}
    </Container>
  );
};
