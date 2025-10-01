import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfileWidget: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="user-widget-new">
      {/* Avatar compacto */}
      <div className="avatar-compact">
        <img src={user.avatarUrl || "/avatars/avatar1.png"} alt="User Avatar" />
      </div>

      {/* Painel expandido */}
      <div className="widget-expanded">
        <div className="user-info-panel">
          <img
            src={user.avatarUrl || "/avatars/avatar1.png"}
            alt="User Avatar"
            className="avatar-large"
          />
          <span className="username">{user.name}</span>
        </div>

        <div className="action-buttons">
          <button
            onClick={() => navigate("/choose-avatar")}
            className="btn-avatar"
          >
            👤 Trocar Avatar
          </button>

          <button onClick={logout} className="btn-logout">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileWidget;
