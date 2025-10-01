// frontend/src/components/AddReviewForm.tsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface AddReviewFormProps {
  itemId: number;
  onReviewAdded: () => void; // Função para recarregar os reviews
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({
  itemId,
  onReviewAdded,
}) => {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Você precisa estar logado para deixar um review.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/items/${itemId}/reviews`,
        { rating: Number(rating), comment }, // <- certinho!
        { headers: { Authorization: `Bearer ${token}` } } // <-- ENVIANDO O TOKEN
      );
      setComment("");
      setRating(5);
      onReviewAdded(); // Avisa o componente pai para atualizar
    } catch (err) {
      setError("Falha ao enviar o review.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Deixe seu Review</h4>
      <div>
        <label htmlFor="rating">Nota (1-10):</label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          min="1"
          max="10"
          required
        />
      </div>
      <div>
        <label htmlFor="comment">Comentário:</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Enviar Review</button>
    </form>
  );
};

export default AddReviewForm;
