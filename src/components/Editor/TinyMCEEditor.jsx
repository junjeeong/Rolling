import React, { useEffect } from "react";
import useTinyMCE from "../../hooks/useTinyMCE"; // 커스텀 훅 불러오기

const TinyMCEEditor = ({ value, onEditorChange, font }) => {
  const isTinyMCEReady = useTinyMCE(); // TinyMCE가 로드되었는지 확인

  useEffect(() => {
    if (isTinyMCEReady && window.tinymce) {
      // 선택된 폰트를 직접 CSS 변수에서 가져오기
      const rootStyles = getComputedStyle(document.documentElement);
      const selectedFont = rootStyles.getPropertyValue(font).trim(); // CSS 변수 해석
      // TinyMCE가 준비된 후에 에디터 초기화
      window.tinymce.init({
        selector: "#editor",
        plugins: "lists link", // 기본 플러그인: 리스트와 링크만 포함
        toolbar: "undo redo | bold italic | bullist numlist | link", // 최소한의 툴바 버튼
        height: 200,
        menubar: false, // 상단 메뉴바 숨김
        license_key: "gpl", // 오픈 소스 라이선스 적용
        branding: false, // 하단 브랜드 표시 비활성화
        statusbar: false, // 하단 상태 표시줄 숨김
        base_url: "/tinymce", // TinyMCE가 호스팅된 경로
        suffix: ".min", // 압축된 파일 사용
        content_style: `body { font-family: ${selectedFont}; }`, // 선택된 폰트 적용
        setup: (editor) => {
          // 에디터 초기화 후, 현재 내용을 설정
          editor.setContent(value || ""); // value가 있으면 해당 값으로 설정

          // 에디터 내용이 변경될 때마다 호출되는 콜백 설정
          editor.on("Change", () => {
            onEditorChange(editor.getContent()); // 에디터 내용 업데이트
          });
        },
      });
    }

    // 컴포넌트 언마운트 시 TinyMCE 제거
    return () => {
      if (window.tinymce) {
        window.tinymce.remove();
      }
    };
  }, [isTinyMCEReady, value, onEditorChange, font]);

  return (
    <div>
      {isTinyMCEReady ? <textarea id="editor" /> : <p>Loading editor...</p>}
    </div>
  );
};

export default TinyMCEEditor;
