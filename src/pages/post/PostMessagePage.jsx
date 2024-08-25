import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const PostMessagePage = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (content, editor) => {
    setContent(content);
    console.log("Content was updated:", content);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <h1>Post a Message</h1>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        initialValue="<p>Write your message here...</p>"
        init={{
          height: 400,
          menubar: false,
          branding: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "print",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "paste",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help",
        }}
        onEditorChange={handleEditorChange}
      />
      <div style={{ marginTop: "20px" }}>
        <h3>Preview</h3>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default PostMessagePage;
