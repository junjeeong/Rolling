import { useState, useEffect } from "react";
import {
  getRecipients,
  getRecipientById,
  getMessagesByRecipientId,
  getReactionsByRecipientId,
} from "../api/recipients";

const useGetData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (fetchFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction(...args);
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

// 모든 롤링 페이퍼 대상 목록 가져오기
const useGetRecipients = () => {
  const { data, loading, error, fetchData } = useGetData();
  useEffect(() => {
    fetchData(getRecipients);
  }, []);
  return { recipients: data, loading, error };
};

// 특정 ID의 롤링 페이퍼 대상 가져오기
const useGetRecipientById = (recipientId) => {
  const { data, loading, error, fetchData } = useGetData();
  useEffect(() => {
    fetchData(getRecipientById, recipientId);
  }, [recipientId]);
  return { recipient: data, loading, error };
};

// 특정 롤링 페이퍼 대상의 메시지 목록 가져오기
const useGetMessagesByRecipientId = (recipientId) => {
  const { data, loading, error, fetchData } = useGetData();
  useEffect(() => {
    fetchData(getMessagesByRecipientId, recipientId);
  }, [recipientId]);
  return { messages: data, loading, error };
};

// 특정 롤링 페이퍼 대상의 리액션 목록 가져오기
const useGetReactionsByRecipientId = (recipientId) => {
  const { data, loading, error, fetchData } = useGetData();
  useEffect(() => {
    fetchData(getReactionsByRecipientId, recipientId);
  }, [recipientId]);
  return { reactions: data, loading, error };
};

export {
  useGetRecipients,
  useGetRecipientById,
  useGetMessagesByRecipientId,
  useGetReactionsByRecipientId,
};
