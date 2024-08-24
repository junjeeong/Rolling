import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import ToOptionPage from "./pages/post/ToOptionPage";

function App() {
  return (
    <Routes>
      <Route index element={<div>Main Page</div>} />
      <Route path="post" element={<ToOptionPage />} />
      <Route path="post/:id" element={<PostDetailPage />} />
    </Routes>
  );
}

export default App;
