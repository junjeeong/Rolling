import { TrashCanButton } from "../../components/common/Button/TrashCanButton";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMessageToRecipient } from "../../api/recipients";

export const TrashCanButtonContainer = ({ seletedCardId, onShowToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteButton = async (e) => {
    // 부모 이벤트 버블링(Modal 켜지는 이벤트) 차단
    e.stopPropagation();

    try {
      // 메시지를 삭제하는 비동기 함수 실행
      await deleteMessageToRecipient(seletedCardId);
      onShowToast();
      // onshowToast가 끝나고 1.5초 후 새로고침
      setTimeout(() => {
        // 무슨 이유 때문인지 모르겠으나 새로운 데이터를 바로 받아오지 못하는 이슈가 발생 하여 강제로 새로고침해버림.
        // setTimeout이 되고난 후 새로고침
        navigate(`/post/${id}/edit`);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("메세지 삭제에 실패하였습니다.", error);
    }
  };

  return (
    <>
      <TrashCanButton onClick={handleDeleteButton} />
    </>
  );
};
