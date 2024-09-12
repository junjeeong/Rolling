import styled from "styled-components";
import plusIcon from "../../../assets/images/icons/plus.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Toast } from "../Toast";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background-color: var(--white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 320px;
    height: 230px;
  }
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
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

export const Icon = styled.img`
  width: 24px; /* 아이콘 크기 조정 */
  height: 24px;
`;
export function AddCard({ id }) {
  const { edit } = useParams();
  const navigate = useNavigate();

  const [toastVisible, setToastVisible] = useState(false);
  const handleNavigate = () => {
    if (edit == undefined) navigate(`message`);
    else {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 1500); // 1.5초 후에 Toast 숨김
    }
  };
  return (
    <Container>
      <AddButton onClick={handleNavigate}>
        <Icon src={plusIcon} alt="Add Icon" />
      </AddButton>
      {toastVisible && (
        <Toast message="현재 페이지는 Edit 페이지입니다 !" type="error" />
      )}
    </Container>
  );
}

//UI, 로직 컴포넌트 분리해야함. -> 9.2 정준영
