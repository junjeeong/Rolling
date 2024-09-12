import { useState, useEffect } from "react";
import { getMessageById } from "../api/messages";

// 메시지 가져오기 커스텀 훅
const useGetMessage = (messageId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMessageById(messageId);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (messageId) {
      fetchMessage();
    }
  }, [messageId]);

  return { data, loading, error };
};

export default useGetMessage;
