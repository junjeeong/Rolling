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

export const TrashButton = () => {
  const handleDeleteButton = (e) => {
    e.stopPropagation();
    alert("card가 없어졌습니다!");
  };

  return (
    <Button onClick={handleDeleteButton}>
      <img src={trashCan} alt="card delete button" />
    </Button>
  );
};
