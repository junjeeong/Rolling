import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "./Cards";
import CardContent from "./CardContent";
import CardReactions from "./CardReactions";
import AnimatedCardList from "./AnimatedCardList";
import { getRecipients } from "../../api/recipients";

const CardListWrapper = styled.div`
  position: relative;
  width: 1160px;
  height: 260px;

  @media (min-width: 769px) and (max-width: 1023px) {
    width: 100vw;
  }

  @media (max-width: 768px) {
    width: 100vw;
    margin-bottom: 34px;
  }
`;

const SlideCardListSection = ({ title, handleCardClick, sortBy }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchRecipients = async () => {
      const data = await getRecipients(0, 1000, sortBy);
      setMessages(data.results);
    };

    fetchRecipients();
  }, [sortBy]);

  return (
    <div>
      <h2>{title}</h2>
      <CardListWrapper>
        <AnimatedCardList
          cards={messages.map((recipient) => (
            <Card key={recipient.id} onClick={() => handleCardClick(recipient.id)} backgroundColor={recipient.backgroundColor} backgroundImageURL={recipient.backgroundImageURL}>
              <CardContent recipientId={recipient.id} recipientName={recipient.name} messageCount={recipient.messageCount} backgroundImageURL={recipient.backgroundImageURL} />
              <CardReactions reactions={recipient.topReactions} />
            </Card>
          ))}
        />
      </CardListWrapper>
    </div>
  );
};

export default SlideCardListSection;
