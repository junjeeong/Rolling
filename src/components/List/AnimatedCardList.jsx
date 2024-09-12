import React from "react";
import styled from "styled-components";

const CardListWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 16px;

  @media (max-width: 1248px) {
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    border-radius: 0;
  }
  border-radius: 0;
`;

const CardList = styled.div`
  display: inline-flex;
  gap: 20px;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $currentOffset }) => `translateX(-${$currentOffset * 1180}px)`};

  @media (max-width: 1248px) {
    transform: translateX(0);
  }

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Spacer = styled.div`
  @media (min-width: 1248px) {
    display: none;
  }

  @media (max-width: 768px) {
    width: 8px;
    flex-shrink: 0;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    width: 4px;
    flex-shrink: 0;
  }
`;

const AnimatedCardList = ({ children, currentOffset }) => {
  return (
    <CardListWrapper>
      <CardList $currentOffset={currentOffset}>
        <Spacer />
        {children}
        <Spacer />
      </CardList>
    </CardListWrapper>
  );
};

export default AnimatedCardList;
