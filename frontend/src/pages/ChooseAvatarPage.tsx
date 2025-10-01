import React from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png",
  "/avatars/avatar5.png",
  "/avatars/avatar6.png",
  "/avatars/avatar7.png",
  "/avatars/avatar8.png",
  "/avatars/avatar9.png",
  "/avatars/avatar10.png",
];

const ChooseAvatarPage: React.FC = () => {
  const { user, token, login } = useAuth();
  const navigate = useNavigate();

  if (!user || !token)
    return (
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
        }}
      >
        <p style={{ color: "var(--text-secondary)", fontSize: "1.2rem" }}>
          Você precisa estar logado.
        </p>
      </main>
    );

  const handleSelectAvatar = async (avatarUrl: string) => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/me/avatar",
        { avatarUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      login(token, {
        ...user,
        avatarUrl: res.data.avatarUrl,
      });
      navigate("/");
    } catch (err) {
      console.error("Erro ao atualizar avatar:", err);
      alert("Erro ao atualizar avatar");
    }
  };

  return (
    <main>
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              color: "var(--text-primary)",
              marginBottom: "1rem",
              fontWeight: "bold",
            }}
          >
            Escolha seu Avatar
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
            }}
          >
            Selecione uma imagem para representar seu perfil
          </p>
        </div>

        <div
          className="avatar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "1.5rem",
            justifyItems: "center",
            marginBottom: "3rem",
          }}
        >
          {avatars.map((avatar, index) => (
            <button
              key={avatar}
              onClick={() => handleSelectAvatar(avatar)}
              className="avatar-option"
              style={{
                position: "relative",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid var(--background-tertiary)`,
                backgroundColor: "var(--background-secondary)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.borderColor = "var(--accent-primary)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 4px rgba(74, 144, 226, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor =
                  "var(--background-tertiary)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={avatar}
                alt={`Avatar ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.3s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  backgroundColor: "rgba(74, 144, 226, 0.2)",
                  opacity: "0",
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="avatar-overlay"
              >
                <svg
                  style={{ width: "24px", height: "24px", color: "white" }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: "var(--background-secondary)",
              color: "var(--text-secondary)",
              border: `1px solid var(--background-tertiary)`,
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--background-tertiary)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                "var(--background-secondary)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChooseAvatarPage;
