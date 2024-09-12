import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardContent from "./CardContent";
import { PrevButton, NextButton } from "./NavigationButton";
import AnimatedCardList from "./AnimatedCardList";
import EllipsisLoading from "../Loading/EllipsisLoading";

const CardListWrapper = styled.div`
  position: relative;
  width: 1160px;
  height: 260px;

  @media (max-width: 1248px) {
    width: 100%;
  }
`;

const CardList = ({ messages = [], loading }) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (currentOffset > 0) {
      setCurrentOffset((prevOffset) => prevOffset - 1);
    }
  };

  const handleNextClick = () => {
    if ((currentOffset + 1) * 4 < messages.length) {
      setCurrentOffset((prevOffset) => prevOffset + 1);
    }
  };

  const handleCardClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <>
      <CardListWrapper>
        <PrevButton onClick={handlePrevClick} disabled={currentOffset === 0} />
        {loading ? (
          <EllipsisLoading />
        ) : (
          <AnimatedCardList currentOffset={currentOffset}>
            {messages.length === 0 && (
              <h2 style={{ fontSize: "2.4em" }}>롤링 페이퍼를 만들어 보세요</h2>
            )}
            {messages.map((recipient) => (
              <div key={`post-${recipient.id}`}>
                <CardContent
                  id={recipient.id}
                  recipientName={recipient.name}
                  backgroundColor={recipient.backgroundColor}
                  backgroundImageURL={recipient.backgroundImageURL}
                  messageCount={recipient.messageCount}
                  profileImage={recipient.recentMessages}
                  handleCardClick={() => handleCardClick(recipient.id)}
                  recipient={recipient}
                />
              </div>
            ))}
          </AnimatedCardList>
        )}
        <NextButton
          onClick={handleNextClick}
          disabled={(currentOffset + 1) * 4 >= messages.length}
          isNext={true}
        />
      </CardListWrapper>
    </>
  );
};

export default CardList;
