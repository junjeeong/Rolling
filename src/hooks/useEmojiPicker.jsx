import { useState, useEffect, useRef } from "react";

export const useEmojiPicker = (initialEmoji = "") => {
  const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji); // 선택된 이모지를 상태에 저장
    setShowPicker(false); // 이모지 선택기 닫기
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false); // 외부 클릭 시 이모지 선택기 숨기기
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setShowPicker(false); // Esc 키로 이모지 선택기 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    selectedEmoji,
    showPicker,
    setShowPicker,
    handleEmojiSelect,
    pickerRef,
  };
};
