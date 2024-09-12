import styled from "styled-components";

const AuthorCountNoticeWrap = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: 238px;
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
    top: 0;
    left: 16px;
  }

  &:nth-child(2) {
    z-index: 2;
    top: 0;
    left: 32px;
  }

  &:nth-child(3) {
    z-index: 3;
    top: 0;
    left: 48px;
  }
`;

const OtherAuthorsCount = styled.div`
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

export function AuthorNotice({ paperInfo, authors }) {
  return (
    <AuthorCountNoticeWrap>
      <div style={{ width: "76px", height: "28px" }}>
        {authors.map((message, index) =>
          index < 3 ? (
            <AuthorProfile key={index} src={message.profileImageURL} />
          ) : index === 3 ? (
            <OtherAuthorsCount key={index}>
              +{authors.length - 3}
            </OtherAuthorsCount>
          ) : null
        )}
      </div>
      <span>
        <span style={{ fontWeight: "bold" }}>{paperInfo.messageCount}</span>
        명이 작성했어요!
      </span>
    </AuthorCountNoticeWrap>
  );
}
