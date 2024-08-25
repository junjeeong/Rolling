import { useState } from "react";
import { deleteMessageById } from "../api/messages";

// 메시지 삭제 커스텀 훅
const useDeleteMessage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteMessage = async (messageId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteMessageById(messageId);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, data, loading, error };
};

export default useDeleteMessage;
