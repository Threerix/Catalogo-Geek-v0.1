// frontend/src/pages/RegisterPage.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Falha ao registrar.");
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div>
      <h2>Página de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* CORREÇÃO AQUI: `htmlFor` no label e `id` no input */}
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          {/* E AQUI */}
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          {/* E AQUI */}
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
