// frontend/src/AppContent.tsx

import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import MyReviews from "./pages/MyReviews"; // ✅ adicionar
import Navbar from "./components/Navbar";
import UserProfileWidget from "./components/UserProfileWidget";
import { useAuth } from "./context/AuthContext";
import "./App.css";
import ChooseAvatarPage from "./pages/ChooseAvatarPage";

function AppContent() {
  const { token } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/item/:id" element={<ItemDetailPage />} />
          <Route path="/my-reviews" element={<MyReviews />} />{" "}
          {/* ✅ nova rota */}
          <Route path="/choose-avatar" element={<ChooseAvatarPage />} />
        </Routes>
      </main>
      {token && <UserProfileWidget />}
    </div>
  );
}

export default AppContent;
