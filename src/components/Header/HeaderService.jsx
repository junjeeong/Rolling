import styled from "styled-components";
import { EmojiTopBadge } from "../Emoji/EmojiTopBadge";
import { AddEmoji } from "../Emoji/AddEmoji";
import { AuthorNotice } from "./AuthorNotice";
import arrowDown from "../../assets/images/icons/arrow_down.png";
import { useGetReactionsByRecipientId } from "../../hooks/useGetRecipients";
import { EmojiAllBadge } from "../Emoji/EmojiAllBadge";
import { useState } from "react";

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
  position: relative;
  display: flex;
  margin-left: 28px;
  gap: 20px;
  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 28px;
  border: 1px solid var(--gray-100);
  margin-left: 28px;
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

export const HeaderService = ({ recipient, messages }) => {
  const [showAllBadge, setShowAllBadge] = useState(false);
  const { reactions } = useGetReactionsByRecipientId(recipient.id);
  return (
    <Container>
      {recipient && (
        <ServiceWrap>
          <p>To: {recipient.name}</p>
          <Wrap style={{ justifyContent: "center", alignItems: "center" }}>
            <Wrap>
              <AuthorNotice paperInfo={recipient} authors={messages} />
              <Divider />
            </Wrap>
            <Wrap>
              <RecipientInfo>
                {recipient.topReactions.length > 0 && <EmojiTopBadge recipient={recipient} />}
                <ArrowDownBtn onClick={() => setShowAllBadge(!showAllBadge)}>
                  <ArrowDown src={arrowDown} />
                </ArrowDownBtn>
                {showAllBadge && <EmojiAllBadge reactions={reactions.results} />}
                <AddEmoji />
              </RecipientInfo>
              <Divider />
            </Wrap>
          </Wrap>
        </ServiceWrap>
      )}
    </Container>
  );
};
