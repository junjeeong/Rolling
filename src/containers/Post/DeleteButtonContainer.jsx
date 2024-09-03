import { DeleteButton } from "../../components/common/Button/DeleteButton";
import { deleteRecipientById } from "../../api/recipients";
import { useNavigate } from "react-router-dom";

export const DeleteButtonContainer = ({ selectedPaperId }) => {
  const navigate = useNavigate();

  const handleDeleteButton = async (e) => {
    try {
      // 메시지를 삭제하는 비동기 함수 실행
      await deleteRecipientById(selectedPaperId);
      alert("메세지가 삭제되었습니다.");
      // 삭제가 성공하면 특정 페이지로 이동
      navigate(`/list/`);
    } catch (error) {
      console.error("메세지 삭제에 실패하였습니다.", error);
    }
  };

  return <DeleteButton onClick={handleDeleteButton} />;
};
