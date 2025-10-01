import React, { useState, useEffect } from "react";
import ItemList from "../components/ItemList";
import UserProfileWidget from "../components/UserProfileWidget";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { user, token } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [reviewCount, setReviewCount] = useState<number>(0);
  const navigate = useNavigate();

  const categories = [
    { key: "ALL", label: "Todos" },
    { key: "GAME", label: "Jogos" },
    { key: "ANIME", label: "Animes" },
    { key: "MANGA", label: "Mangás" },
  ];

  // 🎯 buscar estatísticas do usuário (quantas reviews)
  useEffect(() => {
    const fetchReviews = async () => {
      if (token) {
        try {
          const res = await axios.get("http://localhost:3000/api/me/reviews", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setReviewCount(res.data.count);
        } catch (err) {
          console.error("Erro ao carregar reviews:", err);
        }
      }
    };
    fetchReviews();
  }, [token]);

  return (
    <div>
      <div className="main-content">
        <h2 className="page-title">Bem-vindo ao Catálogo Geek!</h2>

        {/* Stats - somente Reviews */}
        {user && (
          <div className="flex justify-center my-6">
            <button
              onClick={() => navigate("/my-reviews")}
              className="stat-card text-center px-8 py-4 bg-gray-900 rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer"
            >
              <span className="stat-number block text-3xl font-bold text-blue-500">
                {reviewCount}
              </span>
              <span className="stat-label text-gray-400 uppercase tracking-wide">
                Reviews
              </span>
            </button>
          </div>
        )}

        {/* Barra de busca */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar jogos, animes, mangás..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs de categorias */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.key}
              className={`category-tab ${
                activeCategory === category.key ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Seção Em Destaque */}
        <div className="trending-section">
          <div className="section-header">
            <h3 className="section-title">Em Destaque</h3>
            <a href="#" className="see-more-link">
              Ver Mais
            </a>
          </div>
          <ItemList
            category={activeCategory}
            searchTerm={searchTerm}
            limit={6}
            showTitle={false}
          />
        </div>

        {/* Seção Principal */}
        <div className="items-section">
          <div className="section-header">
            <h3 className="section-title">
              {activeCategory === "ALL"
                ? "Todos os Itens"
                : categories.find((c) => c.key === activeCategory)?.label ||
                  "Itens"}
            </h3>
          </div>
          <ItemList
            category={activeCategory}
            searchTerm={searchTerm}
            showTitle={false}
          />
        </div>
      </div>

      {user && <UserProfileWidget />}
    </div>
  );
};

export default HomePage;
