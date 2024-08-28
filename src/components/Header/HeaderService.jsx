import styled from "styled-components";
import { EmojiSelector } from "../Emoji/EmojiSelector";
import { EmojiTopBadge } from "../Emoji/EmojiTopBadge";
import { AuthorNotice } from "./AuthorNotice";

const Container = styled.div`
  background-color: white;
  margin-top: 65px;
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
  font-size: 28px;
  color: var(--gray-800);
  font-weight: var(--font-bold);
`;

const RecipientInfo = styled.div`
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

//getReactionsByRecipientId 함수를 사용하여 수신자의 이모지 정보를 가져올 예정

export const HeaderService = ({ recipient, messages }) => {
  return (
    <Container>
      {recipient && (
        <>
          <ServiceWrap>
            <p style={{ flexGrow: "1" }}>To: {recipient.name}</p>
            <AuthorNotice paperInfo={recipient} authors={messages} />
            <Divider />
            <RecipientInfo>
              <p>이모지 총 개수: {recipient.reactionCount}</p>
              <EmojiTopBadge />
              <EmojiSelector />
            </RecipientInfo>
          </ServiceWrap>
        </>
      )}
    </Container>
  );
};
