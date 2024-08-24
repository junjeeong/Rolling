import "./App.css";
import { Routes, Route } from "react-router-dom";
import ToOptionPage from "./pages/post/ToOptionPage";

function App() {
  return (
    <Routes>
      <Route index element={<div>Main Page</div>} />
      <Route path="post" element={<ToOptionPage />} />
    </Routes>
  );
}

export default App;
