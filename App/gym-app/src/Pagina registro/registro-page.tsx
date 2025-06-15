import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormularioRegistro from "./formulario-maquina";
import Subeimagen from "./sube-img";
import "./registro-page.css";

const RegistroPage: React.FC = () => {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    grupMuscular: "",
    estado: "",
    fechaAdquisicion: "",
    imagenURL: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [resetFormFlag, setResetFormFlag] = useState(false); // Nuevo estado para controlar el reset

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields: (keyof typeof formData)[] = [
      "marca",
      "modelo",
      "grupMuscular",
      "estado",
      "fechaAdquisicion",
    ];

    return requiredFields.every((field) => {
      const value = formData[field];
      return typeof value === "string" ? value.trim() !== "" : value !== "";
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        success: false,
        message: "Por favor complete todos los campos requeridos",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:8080/api/maquinas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      setSubmitStatus({
        success: true,
        message: "¡Máquina registrada exitosamente!",
      });

      // Limpiar el formulario después del éxito
      setFormData({
        marca: "",
        modelo: "",
        grupMuscular: "",
        estado: "",
        fechaAdquisicion: "",
        imagenURL: "",
      });

      // Activar el flag para resetear los errores en el formulario
      setResetFormFlag((prev) => !prev);
    } catch (error) {
      console.error("Error al registrar:", error);
      setSubmitStatus({
        success: false,
        message: "Error al registrar. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registro-page">
      <FormularioRegistro
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        resetForm={resetFormFlag} // Pasamos la prop resetForm
      />
      <Subeimagen />
      <Link to="/">
        <button className="boton-volver">Volver</button>
      </Link>
    </div>
  );
};

export default RegistroPage;
