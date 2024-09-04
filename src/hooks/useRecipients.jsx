import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { getRecipientById } from "../api/recipients";
import { recipientAtom } from "../state/recipientAtom";

const useRecipients = (recipientId) => {
  const [recipient, setRecipient] = useAtom(recipientAtom); // Atom의 상태를 가져오고, 설정하는 함수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipient = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseInfo = await getRecipientById(recipientId);
      setRecipient(responseInfo); // Atom의 상태를 업데이트
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recipientId) {
      fetchRecipient();
    } else {
      setError("recipientId 가 없습니다.");
    }
  }, [recipientId]);

  return { recipient, setRecipient, loading, error };
};

export default useRecipients;
