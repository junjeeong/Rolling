import React, { useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

export const EmojiSelectContainer = ({ showPicker, setShowPicker, onSelectEmoji }) => {
  const pickerRef = useRef(null);

  const handleEmojiSelect = (emojiObject) => {
    onSelectEmoji(emojiObject.emoji); // 선택된 이모지를 상위 컴포넌트로 전달
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false); // 외부 클릭 시 이모지 선택기 숨기기
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowPicker(false); // Esc 키 누를 시 이모지 선택기 숨기기
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowPicker]);

  return (
    <div ref={pickerRef}>
      {showPicker && (
        <div>
          <EmojiPicker autoFocusSearch={true} onEmojiClick={handleEmojiSelect} />
        </div>
      )}
    </div>
  );
};
