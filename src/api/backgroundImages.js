import axios from "./axios";

// 배경 이미지 목록 가져오기
const getBackgroundImages = async () => {
  const response = await axios.get("/background-images/");
  return response.data;
};

export { getBackgroundImages };
