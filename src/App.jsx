import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostDetailPage from './pages/post/PostDetailPage';
import PostOptionPage from './pages/post/PostOptionPage';
import { DefaultLayout } from './styles/DefaultLayout';
import PostMessagePage from './pages/post/PostMessagePage';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<PostOptionPage />} />
        <Route path="post/:id" element={<PostDetailPage />} />
        <Route path="post/:id/message" element={<PostMessagePage />} />
      </Route>
    </Routes>
  );
}

export default App;
