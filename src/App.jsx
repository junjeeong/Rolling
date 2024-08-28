<<<<<<< HEAD
import React from "react";
import { Routes, Route } from "react-router-dom";
import PostDetailPage from "./pages/post/PostDetailPage";
import PostOptionPage from "./pages/post/PostOptionPage";
import { DefaultLayout } from "./styles/DefaultLayout";
import PostMessagePage from "./pages/post/PostMessagePage";
import { Home } from "./pages/Home";
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostDetailPage from './pages/post/PostDetailPage';
import PostOptionPage from './pages/post/PostOptionPage';
import { DefaultLayout } from './styles/DefaultLayout';
import PostMessagePage from './pages/post/PostMessagePage';
import { Home } from './pages/Home';
>>>>>>> de198f8dc1d34de8f750f1a6e34677b8a641a60e

function App() {
  return (
    <Routes>
      {/* PostDetailPage는 DefaultLayout 하위에 두지 않음 */}
      <Route path="post/:id" element={<PostDetailPage />} />
<<<<<<< HEAD
      
=======
>>>>>>> de198f8dc1d34de8f750f1a6e34677b8a641a60e
      {/* DefaultLayout 하위의 다른 페이지들 */}
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<PostOptionPage />} />
        <Route path="post/:id/message" element={<PostMessagePage />} />
      </Route>
    </Routes>
  );
}

export default App;
