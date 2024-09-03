import styled from "styled-components";

const Button = styled.button`
  line-height: 0;
  position: absolute;
  top: 60px;
  right: 15%;
  width: 92px;
  height: 39px;
  padding: 7px 17px;
  border-radius: 6px;
  font-size: 16px;
  background-color: var(--purple-500);
  color: var(--white);
  font-weight: var(--font-bold);
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 1200px) {
    position: static;
    width: 100%;
    height: 56px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  @media (max-width: 768px) {
    padding: 14px 80px;
    font-size: 18px;
  }
`;

export const DeleteButton = () => {
  const handleDeleteButton = (e) => {
    alert("버튼이 정상적으로 눌렸습니다.");
  };

  return <Button onClick={handleDeleteButton}>삭제하기</Button>;
};
