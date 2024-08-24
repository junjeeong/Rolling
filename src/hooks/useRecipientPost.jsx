import { addRecipient } from "../api/recipients";

// 롤링 페이퍼 생성 훅
const useRecipientPost = () => {
  const postRecipient = async (payload) => {
    try {
      const response = await addRecipient(JSON.stringify(payload));
      return response;
    } catch (error) {
      console.error("Error posting recipient:", error);
      throw error;
    }
  };

  return postRecipient;
};

export default useRecipientPost;
