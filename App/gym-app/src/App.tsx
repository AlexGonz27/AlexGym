import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Modal from "./modal";
import Registro from "./Pagina registro/registro-page";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Pantalla Principal</h1>
      <button onClick={() => setIsModalOpen(true)}>Abrir Modal</button>
      <Link to="/page-registro">
        <button>Abrir Nueva Pantalla</button>
      </Link>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Formulario de Registro</h2>
        {/* Aquí irá el formulario */}
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page-registro" element={<Registro />} />
      </Routes>
    </Router>
  );
};

export default App;
