import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./modal";
import "./navbarra.css"; // Archivo de estilos separado

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-logo">
          {/* Espacio para logo - opcional */}
          <span>MiApp</span>
        </div>
        <div className="navbar-buttons">
          <button
            className="nav-button primary"
            onClick={() => setIsModalOpen(true)}
          >
            Abrir Modal
          </button>

          <Link to="/page-registro">
            <button className="nav-button secondary">Pantalla registro</button>
          </Link>
        </div>
        <div className="navbar-spacer"></div> {/* Espacio flexible opcional */}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Formulario de Registro</h2>
      </Modal>
    </nav>
  );
};

export default Navbar;
