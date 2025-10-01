// frontend/src/pages/MyReviews.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  item: { id: number; title: string; type: string };
}

const MyReviews: React.FC = () => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/me/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Erro ao carregar suas reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10">Carregando suas reviews...</p>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold mb-6">Minhas Reviews</h2>
        <p className="text-gray-400">Você ainda não escreveu nenhuma review.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Minhas Reviews</h2>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="p-4 bg-gray-900 rounded-md shadow">
            <h3 className="font-bold text-lg">{review.item.title}</h3>
            <p className="text-sm text-gray-400">
              Nota: <span className="font-bold">{review.rating}</span> |{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">{review.comment || "Sem comentários."}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviews;
