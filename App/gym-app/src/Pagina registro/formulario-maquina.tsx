import React, { useState } from "react";
import "./formulario-maquina.css";

interface FormData {
  nombre: string;
  modelo: string;
  estado: string;
  fechaAdquisicion: string;
}

const FormularioRegistro: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    modelo: "",
    estado: "activo",
    fechaAdquisicion: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:8080/api/maquinas/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setSubmitStatus({success: true, message: 'Máquina registrada exitosamente!'});
      
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        nombre: "",
        modelo: "",
        estado: "Activo",
        fechaAdquisicion: "",
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setSubmitStatus({success: false, message: 'Error al registrar la máquina. Por favor, inténtalo de nuevo.'});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registro-formulario">
      <h1>Registrar máquina</h1>
      {submitStatus && (
        <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Estado:
          <select name="estado" value={formData.estado} onChange={handleChange}>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="mantenimiento">En Mantenimiento</option>
          </select>
        </label>
        <label>
          Fecha de Adquisición:
          <input
            type="date"
            name="fechaAdquisicion"
            value={formData.fechaAdquisicion}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;