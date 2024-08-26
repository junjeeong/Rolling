import { useState } from "react";
import { updateMessageById, patchMessageById } from "../api/messages";

// 메시지 수정 커스텀 훅
const useEditMessage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editMessage = async (editFunction, messageId, messageData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await editFunction(messageId, messageData);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // 전체 수정 (PUT 요청)
  const updateMessage = (messageId, messageData) => {
    return editMessage(updateMessageById, messageId, messageData);
  };

  // 일부 수정 (PATCH 요청)
  const patchMessage = (messageId, messageData) => {
    return editMessage(patchMessageById, messageId, messageData);
  };

  return {
    updateMessage,
    patchMessage,
    data,
    loading,
    error,
  };
};

export default useEditMessage;
