import React, { useState } from "react";
import FormularioRegistro from "./formulario-maquina";
import Subeimagen from "./sube-img";
import "./registro-page.css";

const RegistroPage: React.FC = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    estado: "activo",
    numeroSerie: "",
    ubicacion: "",
    fechaAdquisicion: "",
    notas: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos registrados:", formData);
    alert("¡Máquina registrada exitosamente!");
  };

  return (
    <div className="registro-page">
      <FormularioRegistro
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Subeimagen />
    </div>
  );
};

export default RegistroPage;
