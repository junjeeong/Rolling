import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import styled from 'styled-components';
//스타일 컴포넌트
const EmojiContainer = styled.div`
  position: fixed;
  z-index: 2;
  height: 100px;
`;

export const EmojiPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    setShowPicker(false);
    console.log(emoji);
  };

  return (
    <div>
      <button onClick={() => setShowPicker(!showPicker)}>{selectedEmoji || 'Pick an emoji'}</button>
      {showPicker && (
        <EmojiContainer>
          <Picker set="emojione" data={data} previewPosition="none" onEmojiSelect={handleEmojiSelect} />
        </EmojiContainer>
      )}
    </div>
  );
};
