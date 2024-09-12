import { Editor } from "@tinymce/tinymce-react";

// TinyMCE 전역 변수를 위한 import
import "tinymce/tinymce";
// DOM 모델
import "tinymce/models/dom/model";
// 기본 테마
import "tinymce/themes/silver";
// 툴바 아이콘
import "tinymce/icons/default";
// 기본 스킨과 콘텐츠 스타일
import "tinymce/skins/ui/oxide/skin";
import "tinymce/skins/content/default/content";
import "tinymce/skins/ui/oxide/content";

const BundledEditor = (props) => {
  return (
    <Editor
      {...props}
      init={{
        ...props.init,
        license_key: "gpl", // GPL 라이선스 명시
      }}
    />
  );
};

export default BundledEditor;
