import styled from "styled-components";
const EmojiBadgeWrap = styled.div`
  display: flex;
  gap: 8px;
  width: 66px;
  height: 36px;
  background-color: #0000008a;
  border-radius: 32px;
  padding: 8px 24px;
  color: white;
  font-size: 16px;
  font-weight: var(--font-regular);
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 55px;
    height: 32px;
    padding: 4px;
    font-size: 14px;
    gap: 4px;
  }
`;

//CardList 페이지 모바일 반응형 구현을 위해 isCardList prop 추가로 내림
export const EmojiBadge = ({ emoji, count }) => {
  return (
    <EmojiBadgeWrap>
      <span>{emoji}</span>
      <span>{count}</span>
    </EmojiBadgeWrap>
  );
};
