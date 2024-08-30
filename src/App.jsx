import React from "react";
import { Routes, Route } from "react-router-dom";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostOptionPage from "./pages/post/PostOptionPage";
import { DefaultLayout } from "./styles/DefaultLayout";
import PostMessagePage from "./pages/post/PostMessagePage";
import LandingPage from "./pages/LandingPage";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <Routes>
      {/* PostDetailPage는 DefaultLayout 하위에 두지 않음 */}
      <Route path="post/:id" element={<PostDetailPage />} />
      {/* DefaultLayout 하위의 다른 페이지들 */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="post" element={<PostOptionPage />} />
        <Route path="post/:id/message" element={<PostMessagePage />} />
      </Route>
    </Routes>
  );
}

export default App;
