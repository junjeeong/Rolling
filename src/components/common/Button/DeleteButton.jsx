import styled from "styled-components";

const Button = styled.button`
  position: absolute;
  right: 5px;
  top: 63px;
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

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 720px;
    height: 55px;
    padding: 14px 91px;
    font-weight: 700;
  }
`;

export const DeleteButton = ({ onClick }) => {
  return <Button onClick={onClick}>삭제하기</Button>;
};
