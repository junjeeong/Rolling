import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<div>Main Page</div>} />
        <Route path="post/:id" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
