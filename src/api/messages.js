import api from "./axios";

const TEAM = "9-3";

// 메세지 가져오기
const getMessageById = async (messageId) => {
  const response = await api.get(`/${TEAM}/messages/${messageId}/`);
  return response.data;
};

// 메세지 전체 수정하기
const updateMessageById = async (messageId, messageData) => {
  const response = await api.put(
    `/${TEAM}/messages/${messageId}/`,
    messageData
  );
  return response.data;
};

// 메세지 일부 수정하기
const patchMessageById = async (messageId, messageData) => {
  const response = await api.patch(
    `/${TEAM}/messages/${messageId}/`,
    messageData
  );
  return response.data;
};

// 메세지 삭제하기
const deleteMessageById = async (messageId) => {
  const response = await api.delete(`/${TEAM}/messages/${messageId}/`);
  return response.data;
};

export {
  getMessageById,
  updateMessageById,
  patchMessageById,
  deleteMessageById,
};
