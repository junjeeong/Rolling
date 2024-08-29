import React, { useEffect, useRef, useState } from "react";
import ModalCard from "../../components/common/Card/ModalCard.jsx";

function ModalCardContainer({ onClose, selectedCardInfo }) {
  const cardRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      // modalRef가 정의된 요소 외부에서 클릭이 발생했는지 확인
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    // 마우스 버튼이 눌렸을 때 이벤트 감지
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.2)";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.backgroundColor = "";
    };
  }, [onClose]);

  return <ModalCard ref={cardRef} selectedCardInfo={selectedCardInfo} />;
}

export default ModalCardContainer;
