// frontend/src/pages/ItemDetailPage.tsx

import React, { useState, useEffect, useCallback } from "react";
import type { FC } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import AddReviewForm from "../components/AddReviewForm";

interface Item {
  id: number;
  title: string;
  description: string;
  type: string;
  releaseDate: string;
  imageUrl: string | null;
}

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: { name: string };
}

const ItemDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [item, setItem] = useState<(Item & { reviews: Review[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItem = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:3000/api/items/${id}`);
      setItem(response.data);
    } catch (err) {
      setError("Item não encontrado ou falha ao carregar.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  if (loading) return <p>Carregando item...</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!item) return <p>Nenhum item para exibir.</p>;

  return (
    <div>
      <div className="item-detail-container">
        <div className="item-detail-poster">
          {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
        </div>
        <div className="item-detail-info">
          <h2>{item.title}</h2>
          <p>
            <strong>Tipo:</strong> {item.type}
          </p>
          <p>
            <strong>Data de Lançamento:</strong>{" "}
            {new Date(item.releaseDate).toLocaleDateString()}
          </p>
          <p>{item.description}</p>
        </div>
      </div>

      <hr />

      <div className="reviews-section">
        <h3>Reviews</h3>

        {/* Formulário de review vem ANTES da lista para melhor usabilidade */}
        {token && (
          <AddReviewForm itemId={parseInt(id!)} onReviewAdded={fetchItem} />
        )}

        <div className="reviews-list">
          {item.reviews && item.reviews.length > 0 ? (
            item.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <strong>
                    {review.user.name} - Nota: {review.rating}/10
                  </strong>
                  <small>
                    Em: {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
                {review.comment && <p>"{review.comment}"</p>}
              </div>
            ))
          ) : (
            <p>Este item ainda não possui reviews. Seja o primeiro!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
