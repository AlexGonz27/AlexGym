import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registro from "./Pagina registro/registro-page";
import "./App.css";
import Navbar from "./navbarra";

const Home: React.FC = () => {
  return (
    <div className="parent">
      <div className="div1">
        <Navbar />
      </div>

      <div className="div3">
        <h1>Pantalla Principal</h1>
      </div>

      <div className="div4"></div>
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
