import styled from "styled-components";
import { EmojiSelector } from "../Emoji/EmojiSelector";
import { EmojiTopBadge } from "../Emoji/EmojiTopBadge";
const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  height: 68px;
  padding: 13px 0;
`;

const AuthorCountNoticeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 228px;
  height: 28px;
  font-size: 18px;
  font-weight: normal;
`;

const AuthorProfile = styled.img`
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--white);

  &:nth-child(1) {
    z-index: 1;
    margin-left: 16px;
  }

  &:nth-child(2) {
    z-index: 2;
    margin-left: 32px;
  }

  &:nth-child(3) {
    z-index: 3;
    margin-left: 48px;
  }
`;

const OtherAuthors = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--gray-100);
  background-color: var(--white);
  font-size: 12px;
  z-index: 4;
  margin-left: 64px;
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

export const HeaderService = ({ recipient, messages }) => {
  return (
    <Container>
      {recipient && (
        <>
          <ServiceWrap>
            <p>To: {recipient.name}</p>
            <AuthorCountNoticeWrap>
              <div style={{ width: "76px", position: "relative" }}>
                {messages.map((message, index) =>
                  index < 3 ? (
                    <AuthorProfile key={index} src={message.profileImageURL} />
                  ) : index === 3 ? (
                    <OtherAuthors key={index}>
                      +{messages.length - 3}
                    </OtherAuthors>
                  ) : null
                )}
              </div>
              <span>
                <span style={{ fontWeight: "bold" }}>
                  {recipient.messageCount}
                </span>
                명이 작성했어요!
              </span>
            </AuthorCountNoticeWrap>
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
