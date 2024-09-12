import { useState, useEffect } from "react";
import { addReactionToRecipient, getReactionsByRecipientId } from "../api/recipients";
import { EMOJI_TYPES } from "../constants/emojiTypes";

const useReactions = (recipientId) => {
  const [reactions, setReactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseInfo = await getReactionsByRecipientId(recipientId);
      setReactions(responseInfo.results);
      return responseInfo.results;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipientId) {
      fetchReactions();
    } else {
      setError("recipientId 가 없습니다.");
    }
  }, [recipientId]);

  const addReaction = async ({ emoji, type }) => {
    if (type === EMOJI_TYPES.INCREASE) {
      try {
        await addReactionToRecipient(recipientId, {
          emoji,
          type,
        });
        // 성공 시 반영된 데이터를 다시 가져오기
        const updatedReactions = await fetchReactions();
        return updatedReactions;
      } catch (err) {
        setError(err); // 에러 핸들링
      }
    }
  };

  return { reactions, setReactions, addReaction, loading, error };
};

export default useReactions;
