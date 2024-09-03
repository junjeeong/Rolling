import React, { useEffect, useRef } from "react";
import ModalCard from "../../components/common/Card/ModalCard.jsx";

const ModalCardContainer = ({ handleModalOpen, selectedCardInfo }) => {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      // modalRef가 정의된 요소 외부에서 클릭이 발생할 경우 모달 닫기 기능.
      if (modalRef.current && !modalRef.current.contains(event.target))
        handleModalOpen(false);
    }
    // 모달이 mount되면 전체 영역에 mousedown 이벤트리스너 달기.
    document.addEventListener("mousedown", handleClickOutside);
    // 모달이 unmount 되면 달아둔 mousedown 이벤트리스너 삭제
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ModalCard
      ref={modalRef}
      handleModalOpen={handleModalOpen}
      selectedCardInfo={selectedCardInfo}
    />
  );
};

export default ModalCardContainer;
