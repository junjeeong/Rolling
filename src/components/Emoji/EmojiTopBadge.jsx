import styled from 'styled-components';
const EmojiBadge = styled.div`
  display: flex;
  gap: 4px;
  background-color: #0000008a;
  border-radius: 32px;
  padding: 8px 24px;
  color: white;
  font-size: 16px;
  font-weight: var(--font-regular);
`;
export const EmojiTopBadge = () => {
  return (
    <EmojiBadge>
      <p>👍</p>
      <p>3</p>
    </EmojiBadge>
  );
};
