import axios from "./axios";

// 프로필 이미지 목록 가져오기
const getProfileImages = async () => {
  const response = await axios.get("/profile-images/");
  return response.data;
};

export { getProfileImages };
