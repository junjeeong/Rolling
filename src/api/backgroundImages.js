import axios from "./axios";

const getBackgroundImages = async () => {
  const response = await axios.get("/background-images/");
  return response.data;
};

export { getBackgroundImages };
