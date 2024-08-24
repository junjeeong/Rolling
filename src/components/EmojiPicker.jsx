import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
export const EmojiPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    setShowPicker(false);
    console.log(emoji);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => setShowPicker(!showPicker)}>{selectedEmoji || "Pick an emoji"}</button>
      {showPicker && <Picker set="emojione" data={data} previewPosition="none" onEmojiSelect={handleEmojiSelect} />}
    </div>
  );
};
