import React from "react";
import EmojiPicker from "emoji-picker-react";

export const EmojiSelector = ({ showPicker, onSelectEmoji, pickerRef }) => {
  return (
    <div ref={pickerRef}>
      {showPicker && (
        <div>
          <EmojiPicker autoFocusSearch={true} onEmojiClick={(emojiObject, e) => onSelectEmoji(emojiObject.emoji)} />
        </div>
      )}
    </div>
  );
};
