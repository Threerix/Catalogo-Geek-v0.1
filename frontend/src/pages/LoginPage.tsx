// frontend/src/pages/LoginPage.tsx

import React, { useState } from "react";
import type { FC, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      if (response.data.token && response.data.user) {
        // ✅ Agora passamos o avatarUrl corretamente
        login(response.data.token, {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          avatarUrl: response.data.user.avatarUrl, // <- aqui
        });

        navigate("/");
      } else {
        setError("Resposta inválida do servidor.");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "Falha no login.");
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="login-email">Email:</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="login-password">Senha:</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginPage;
