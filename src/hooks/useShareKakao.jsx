import { useEffect, useState } from "react";

const useShareKakao = () => {
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    // script 요소를 생성하여 Kakao JavaScript SDK를 로드
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    // 하위 리소스 무결성을 사용
    script.integrity =
      "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    script.crossOrigin = "anonymous";
    script.async = true;

    // 생성된 script 요소를 body에 추가
    document.body.appendChild(script);

    // script가 로드된 후 실행되는 콜백 함수
    script.onload = () => {
      // Kakao SDK 로드 완료 설정
      setIsKakaoReady(true);
    };

    // 컴포넌트가 언마운트될 때 script 요소를 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Kakao SDK가 로드되었는지 여부를 반환
  return isKakaoReady;
};

export default useShareKakao;
