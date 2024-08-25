import { useEffect, useState } from "react";

const getOptionSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 154;
  } else if (width < 1200) {
    return 168;
  } else {
    return 168;
  }
};

// 반응형 롤링 페이퍼 사이즈 커스텀 훅
const usePostOptionSize = () => {
  const [optionSize, setOptionSize] = useState(getOptionSize());

  useEffect(() => {
    const handleResize = () => {
      setOptionSize(getOptionSize());
    };
    // resize 이벤트 추가
    window.addEventListener("resize", handleResize);

    return () => {
      // resize 이벤트 삭제
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return optionSize;
};

export default usePostOptionSize;
