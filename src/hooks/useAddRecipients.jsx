import { useState } from "react";
import {
  addRecipient,
  addMessageToRecipient,
  addReactionToRecipientMessage,
} from "../api/recipients";

const useAddData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (addFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addFunction(...args);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, addData };
};

// 롤링 페이퍼 대상 추가하기
const useAddRecipient = () => {
  const { data, loading, error, addData } = useAddData();
  return {
    addRecipient: (recipientData) => addData(addRecipient, recipientData),
    data,
    loading,
    error,
  };
};

// 특정 롤링 페이퍼 대상에게 메시지 추가하기
const useAddMessageToRecipient = (recipientId) => {
  const { data, loading, error, addData } = useAddData();
  return {
    addMessage: (messageData) =>
      addData(addMessageToRecipient, recipientId, messageData),
    data,
    loading,
    error,
  };
};

// 특정 롤링 페이퍼 대상의 메시지에 리액션 추가하기
const useAddReactionToRecipientMessage = (recipientId) => {
  const { data, loading, error, addData } = useAddData();
  return {
    addReaction: (reactionData) =>
      addData(addReactionToRecipientMessage, recipientId, reactionData),
    data,
    loading,
    error,
  };
};

export {
  useAddRecipient,
  useAddMessageToRecipient,
  useAddReactionToRecipientMessage,
};
