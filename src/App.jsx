import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetailPage from './pages/post/PostDetailPage';
import ToOptionPage from './pages/post/ToOptionPage';
import { DefaultLayout } from './styles/DefaultLayout';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<ToOptionPage />} />
        <Route path="post/:id" element={<PostDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
