import styled from "styled-components";

const Button = styled.button`
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

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const DeleteButton = () => {
  const handleDeleteButton = (e) => {
    alert("버튼이 정상적으로 눌렸습니다.");
  };

  return <Button onClick={handleDeleteButton}>삭제하기</Button>;
};
