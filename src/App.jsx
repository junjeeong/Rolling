import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";
import ToOptionPage from "./pages/post/ToOptionPage";
import Header from "./components/common/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<div>Main Page</div>} />
        <Route path="post" element={<ToOptionPage />} />
        <Route path="post/:id" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
