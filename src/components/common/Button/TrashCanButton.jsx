import styled from "styled-components";
import trashCan from "../../../assets/images/icons/trashcan.png";

const Button = styled.div`
  padding: 8px 8px;
  width: 40px;
  height: 40px;
  border: 1px solid var(--gray-100);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const TrashCanButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <img src={trashCan} alt="card delete button" />
    </Button>
  );
};
