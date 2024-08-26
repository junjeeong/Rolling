import React, { useState, useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import styled from 'styled-components';
import OutlineButton from '../common/Button/OutlineButton';
import plus from '../../assets/images/icons/emoji_plus.png';
const EmojiContainer = styled.div`
  position: relative;
`;
const EmojiWrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  height: 100px;
`;
const EmojiBtnWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 6px 16px;
  color: var(--gray-900);
  font-size: 16px;
  font-weight: var(--font-medium);
`;

export const EmojiSelector = () => {
  // 이모지 선택기 표시 여부 및 선택된 이모지를 관리하는 상태
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const pickerRef = useRef(null); // 이모지 선택기 컨테이너에 대한 ref

  // 이모지 선택 처리 함수
  const handleEmojiSelect = (emojiObject, event) => {
    setSelectedEmoji(emojiObject.emoji); // 선택된 이모지를 설정
    setShowPicker(false); // 이모지 선택 후 선택기를 숨김
    console.log('이모지', emojiObject); // 선택된 이모지를 로그로 출력
  };

  // 외부 클릭이나 Esc 키를 눌렀을 때 이모지 선택기를 닫음
  useEffect(() => {
    const handleClickOutside = (event) => {
      // contains() 메서드는 주어진 DOM 요소(event.target)가 특정 요소(pickerRef.current) 내부에 포함되어 있으면 반환합니다.
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false); // 선택기를 닫음
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowPicker(false); // 선택기를 닫음
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 정리
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <EmojiContainer>
      <OutlineButton onClick={() => setShowPicker(!showPicker)}>
        <EmojiBtnWrap>
          <img src={plus} alt="emoji_plus" width="24px" />
          추가
        </EmojiBtnWrap>
      </OutlineButton>
      {showPicker && (
        <EmojiWrap ref={pickerRef}>
          <EmojiPicker autoFocusSearch={true} onEmojiClick={handleEmojiSelect} />
        </EmojiWrap>
      )}
    </EmojiContainer>
  );
};