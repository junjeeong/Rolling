import axios from "./axios";

const getRecipients = async () => {
  const response = await axios.get("/9-3/recipients");
  return response.data;
};

export { getRecipients };
