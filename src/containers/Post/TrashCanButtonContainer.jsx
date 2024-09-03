import { TrashCanButton } from "../../components/common/Button/TrashCanButton";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMessageToRecipient } from "../../api/recipients";

export const TrashCanButtonContainer = ({ seletedCardId }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteButton = async (e) => {
    // 부모 이벤트 버블링(Modal 켜지는 이벤트) 차단
    e.stopPropagation();

    try {
      // 메시지를 삭제하는 비동기 함수 실행
      await deleteMessageToRecipient(seletedCardId);
      alert("메세지가 삭제되었습니다.");
      navigate(`/post/${id}/edit`);
      // 무슨 이유 때문인지 모르겠으나 새로운 데이터를 바로 받아오지 못하는 이슈가 발생 하여 강제로 새로고침해버림.
      window.location.reload();
    } catch (error) {
      console.error("메세지 삭제에 실패하였습니다.", error);
    }
  };

  return <TrashCanButton onClick={handleDeleteButton} />;
};