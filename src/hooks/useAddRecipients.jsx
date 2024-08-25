import { useState } from "react";
import {
  addRecipient,
  addMessageToRecipient,
  addReactionToRecipientMessage,
} from "../api/recipients";

const useAddData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addData = async (addFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await addFunction(...args);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, addData };
};

// 롤링 페이퍼 대상 추가하기
const useAddRecipient = () => {
  const { loading, error, addData } = useAddData();
  return {
    addRecipient: (recipientData) => addData(addRecipient, recipientData),
    loading,
    error,
  };
};

// 특정 롤링 페이퍼 대상에게 메시지 추가하기
const useAddMessageToRecipient = (recipientId) => {
  const { loading, error, addData } = useAddData();
  return {
    addMessage: (messageData) =>
      addData(addMessageToRecipient, recipientId, messageData),
    loading,
    error,
  };
};

// 특정 롤링 페이퍼 대상의 메시지에 리액션 추가하기
const useAddReactionToRecipientMessage = (recipientId) => {
  const { loading, error, addData } = useAddData();
  return {
    addReaction: (reactionData) =>
      addData(addReactionToRecipientMessage, recipientId, reactionData),
    loading,
    error,
  };
};

export {
  useAddRecipient,
  useAddMessageToRecipient,
  useAddReactionToRecipientMessage,
};
