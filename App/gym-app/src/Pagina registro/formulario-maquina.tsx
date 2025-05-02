import React from "react";
import "./formulario-maquina.css";

interface FormularioRegistroProps {
  formData: {
    marca: string;
    modelo: string;
    estado: string;
    numeroSerie: string;
    ubicacion: string;
    fechaAdquisicion: string;
    notas: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const FormularioRegistro: React.FC<FormularioRegistroProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="registro-formulario">
      <h1>Registrar maquina</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca}
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
          Número de Serie:
          <input
            type="text"
            name="numeroSerie"
            value={formData.numeroSerie}
            onChange={handleChange}
          />
        </label>
        <label>
          Ubicación:
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          />
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
        <label>
          Notas:
          <input
            className="Nota-maquina"
            type="text"
            name="notas"
            value={formData.notas}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
