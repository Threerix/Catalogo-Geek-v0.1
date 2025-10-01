// frontend/src/components/ItemList.tsx
import React, { useState, useEffect } from "react";
import type { FC } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  title: string;
  description: string;
  type: string;
  imageUrl: string | null;
  releaseDate: string;
}

interface ItemListProps {
  category?: string;
  searchTerm?: string;
  limit?: number;
  showTitle?: boolean;
}

const ItemList: FC<ItemListProps> = ({
  category = "ALL",
  searchTerm = "",
  limit,
  showTitle = true,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/items");
        setItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filtragem dos itens
  const filteredItems = items.filter((item) => {
    const matchesCategory = category === "ALL" || item.type === category;
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Aplicar limit se fornecido
  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  // Função para extrair ano da data
  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  // Função para formatar tipo
  const formatType = (type: string) => {
    switch (type) {
      case "GAME":
        return "Game";
      case "ANIME":
        return "Anime";
      case "MANGA":
        return "Mangá";
      default:
        return type.toLowerCase();
    }
  };

  if (loading) {
    return <div className="loading">Carregando catálogo...</div>;
  }

  if (displayItems.length === 0) {
    return (
      <div className="no-items">
        <p>Nenhum item encontrado para os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      {showTitle && (
        <h2 className="section-title">
          {category === "ALL" ? "Todos os Itens" : `${formatType(category)}s`}
        </h2>
      )}

      <div className="item-grid">
        {displayItems.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id} className="item-card">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} />
            ) : (
              <div className="placeholder-image">
                <span>Sem Imagem</span>
              </div>
            )}
            <div className="item-card-content">
              <h3>{item.title}</h3>
              <div className="item-meta">
                <p>{formatType(item.type)}</p>
                <span className="year">{getYear(item.releaseDate)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
