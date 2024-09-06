import { DeleteButton } from "../../components/common/Button/DeleteButton";
import { deleteRecipientById } from "../../api/recipients";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Toast } from "../../components/common/Toast";

export const DeleteButtonContainer = ({ selectedPaperId }) => {
  const navigate = useNavigate();

  const [toastVisible, setToastVisible] = useState(false);
  const handleDeleteButton = async (e) => {
    try {
      // 메시지를 삭제하는 비동기 함수 실행
      await deleteRecipientById(selectedPaperId);
      setToastVisible(true);
      // 삭제가 성공하면 특정 페이지로 이동
      setTimeout(() => {
        setToastVisible(false);
        navigate(`/list/`);
      }, 1500);
    } catch (error) {
      console.error("메세지 삭제에 실패하였습니다.", error);
    }
  };

  return (
    <>
      <DeleteButton onClick={handleDeleteButton} />
      {toastVisible && (
        <Toast message="롤링 페이퍼가 성공적으로 삭제되었습니다." />
      )}
    </>
  );
};
