// frontend/src/components/Navbar.tsx - VERSÃO CORRIGIDA FINAL

import React from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// A LINHA "import './Navbar.css';" FOI REMOVIDA

const Navbar: FC = () => {
  const { token } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Catálogo Geek
      </Link>
      <div className="navbar-links">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
