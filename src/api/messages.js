import axios from "./axios";

const TEAM = "9-3";

// 메세지 가져오기
const getMessageById = async (messageId) => {
  const response = await axios.get(`/${TEAM}/messages/${messageId}/`);
  return response.data;
};

// 메세지 업데이트하기 (전체 수정)
const updateMessageById = async (messageId, messageData) => {
  const response = await axios.put(
    `/${TEAM}/messages/${messageId}/`,
    messageData
  );
  return response.data;
};

// 메세지 일부 수정하기
const patchMessageById = async (messageId, messageData) => {
  const response = await axios.patch(
    `/${TEAM}/messages/${messageId}/`,
    messageData
  );
  return response.data;
};

// 메세지 삭제하기
const deleteMessageById = async (messageId) => {
  const response = await axios.delete(`/${TEAM}/messages/${messageId}/`);
  return response.data;
};

export {
  getMessageById,
  updateMessageById,
  patchMessageById,
  deleteMessageById,
};
