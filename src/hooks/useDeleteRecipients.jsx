import { useState } from "react";
import { deleteRecipientById } from "../api/recipients";

const useDeleteData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (deleteFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteFunction(...args);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, deleteData };
};

// 특정 ID의 롤링 페이퍼 대상 삭제하기
const useDeleteRecipient = () => {
  const { data, loading, error, deleteData } = useDeleteData();
  return {
    deleteRecipient: (recipientId) =>
      deleteData(deleteRecipientById, recipientId),
    data,
    loading,
    error,
  };
};

export { useDeleteRecipient };
