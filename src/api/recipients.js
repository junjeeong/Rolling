import axios from "./axios";

const TEAM = "9-3";

// 롤링 페이퍼 대상 목록 가져오기
const getRecipients = async () => {
  const response = await axios.get(`/${TEAM}/recipients/`);
  return response.data;
};

// 롤링 페이퍼 대상 가져오기
const getRecipientById = async (recipientId) => {
  const response = await axios.get(`/${TEAM}/recipients/${recipientId}/`);
  return response.data;
};

// 롤링 페이퍼 대상 생성하기
const addRecipient = async (recipientData) => {
  const response = await axios.post(`/${TEAM}/recipients/`, recipientData);
  return response.data;
};

// 롤링 페이퍼 대상 삭제하기
const deleteRecipientById = async (recipientId) => {
  const response = await axios.delete(`/${TEAM}/recipients/${recipientId}/`);
  return response.data;
};

// 롤링 페이퍼 대상에게 메세지 생성하기
const addMessageToRecipient = async (recipientId, messageData) => {
  const response = await axios.post(
    `/${TEAM}/recipients/${recipientId}/messages/`,
    messageData
  );
  return response.data;
};

//롤링 페이퍼 대상의 메세지 삭제하기
const deleteMessageToRecipient = async (recipientId) => {
  const response = await axios.delete(`/${TEAM}/messages/${recipientId}/`);
  return response.data;
};

// 롤링 페이퍼 대상의 메세지 목록 가져오기
const getMessagesByRecipientId = async (recipientId) => {
  const response = await axios.get(
    `/${TEAM}/recipients/${recipientId}/messages/?limit=9`
  );
  return response.data;
};

// 롤링 페이퍼 대상에게 리액션 달기
const addReactionToRecipient = async (recipientId, reactionData) => {
  const response = await axios.post(
    `/${TEAM}/recipients/${recipientId}/reactions/`,
    reactionData
  );
  return response.data;
};

// 롤링 페이퍼 대상에게 리액션 목록 가져오기
const getReactionsByRecipientId = async (recipientId) => {
  const response = await axios.get(
    `/${TEAM}/recipients/${recipientId}/reactions/`
  );
  return response.data;
};

const getAllUser = async (params = { limit: 10, offset: 0 }) => {
  const query = new URLSearchParams(params).toString();
  const response = await axios.get(`/${TEAM}/recipients/?${query}`);
  return response.data;
};

export {
  getRecipients,
  getRecipientById,
  addRecipient,
  deleteRecipientById,
  deleteMessageToRecipient,
  addMessageToRecipient,
  getMessagesByRecipientId,
  addReactionToRecipient,
  getReactionsByRecipientId,
  getAllUser,
};