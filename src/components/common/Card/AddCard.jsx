import styled from 'styled-components';
import plusIcon from '../../../assets/images/icons/plus.png';
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background-color: var(--white);
`;

export const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  background-color: var(--gray-500);
  border-radius: 50%;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 24px; /* 아이콘 크기 조정 */
  height: 24px;
`;
export function AddCard() {
  return (
    <Container>
      <AddButton>
        <Icon src={plusIcon} alt="Add Icon" />
      </AddButton>
    </Container>
  );
}
