import styled from "styled-components";
const EmojiBadgeWrap = styled.div`
  display: flex;
  gap: 4px;
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
`;

export const EmojiBadge = ({ emoji, count }) => {
  return (
    <EmojiBadgeWrap>
      <span>{emoji}</span>
      <span>{count}</span>
    </EmojiBadgeWrap>
  );
};
