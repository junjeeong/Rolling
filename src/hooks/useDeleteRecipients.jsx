import { useState } from "react";
import { deleteRecipientById } from "../api/recipients";

// 특정 ID의 롤링 페이퍼 대상을 삭제하기 위한 커스텀 훅
const useDeleteRecipient = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRecipient = async (recipientId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteRecipientById(recipientId);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteRecipient,
    data,
    loading,
    error,
  };
};

export { useDeleteRecipient };
