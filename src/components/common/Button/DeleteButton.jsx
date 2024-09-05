import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  height: 39px;
  padding: 7px 20px;
  border-radius: 6px;
  font-size: 16px;
  background-color: var(--purple-500);
  color: var(--white);
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    position: fixed;
    top: auto;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%); /* 가로 세로 정렬 */
    min-width: 720px;
    height: 56px;
    font-size: 18px;
    font-weight: bold;
    border-radius: 12px;
  }

  @media (max-width: 768px) {
    padding: 14px 80px;
    min-width: 320px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const DeleteButton = ({ onClick }) => {
  return <Button onClick={onClick}>삭제하기</Button>;
};
