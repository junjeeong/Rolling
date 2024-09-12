import React from "react";
import EmojiPicker from "emoji-picker-react";

export const EmojiSelectContainer = ({ showPicker, onSelectEmoji, pickerRef }) => {
  return (
    <div ref={pickerRef}>
      {showPicker && (
        <div>
          <EmojiPicker autoFocusSearch={true} onEmojiClick={(e, emojiObject) => onSelectEmoji(emojiObject.emoji)} />
        </div>
      )}
    </div>
  );
};
