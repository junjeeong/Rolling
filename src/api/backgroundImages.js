import api from "./axios"; // 위에서 설정한 axios 인스턴스 사용

export const getBackgroundImages = async () => {
  try {
    const response = await api.get("/background-images/?format=json");
    //console.log("🚀 ~ getBackgroundImages ~ response.data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch background images:", error);
    throw error;
  }
};
