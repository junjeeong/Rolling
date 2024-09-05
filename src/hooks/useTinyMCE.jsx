import { useEffect, useState } from "react";

const useTinyMCE = () => {
  const [isTinyMCEReady, setIsTinyMCEReady] = useState(false);

  useEffect(() => {
    // script 요소를 생성하여 TinyMCE를 로드
    const script = document.createElement("script");
    script.src = "/tinymce/tinymce.min.js"; // 자체 호스팅된 TinyMCE 파일 경로
    script.referrerPolicy = "origin";
    script.async = true;

    // script가 로드된 후 실행되는 콜백 함수
    script.onload = () => {
      setIsTinyMCEReady(true); // TinyMCE가 로드 완료됨을 설정
    };

    // script 요소를 body에 추가
    document.body.appendChild(script);

    // 컴포넌트가 언마운트될 때 script 요소를 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // TinyMCE가 로드되었는지 여부를 반환
  return isTinyMCEReady;
};

export default useTinyMCE;
