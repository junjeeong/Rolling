import axios from "./axios";

const TEAM = "9-3";

const getRecipients = async () => {
  const response = await axios.get(`/${TEAM}/recipients/`);
  return response.data;
};

const getRecipientById = async (id) => {
  const response = await axios.get(`/${TEAM}/recipients/${id}/`);
  console.log(response.data);
  return response.data;
};

const addRecipient = async (formData) => {
  const response = await axios.post(`/${TEAM}/recipients/`, formData);
  return response.data;
};

export { getRecipients, getRecipientById };
