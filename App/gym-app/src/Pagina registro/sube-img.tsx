import React from "react";
import { Link } from "react-router-dom";
import "./sube-img.css";

const UploadImagen: React.FC = () => {
  return (
    <div className="registro-imagen">
      <h2>Anexar Imagen</h2>
      <div className="imagen-contenedor">
        <p>Sube aquí la imagen</p>
      </div>
      <input type="file" accept="image/*" />
      <Link to="/">
        <button style={{ marginTop: "20px" }}>
          Volver a la Pantalla Principal
        </button>
      </Link>
    </div>
  );
};

export default UploadImagen;
