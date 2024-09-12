import api from "./axios";

// 프로필 이미지 목록 가져오기
const getProfileImages = async () => {
  const response = await api.get("/profile-images/?format=json");
  return response.data;
};

export { getProfileImages };
