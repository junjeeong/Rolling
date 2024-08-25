import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import PostOptionPage from "./pages/post/PostOptionPage";
import Header from "./components/common/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<div>Main Page</div>} />
        <Route path="post" element={<PostOptionPage />} />
        <Route path="post/:id" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
