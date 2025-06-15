import React, { useState, useEffect } from "react";
import "./formulario-maquina.css";

interface FormData {
  marca: string;
  modelo: string;
  grupMuscular: string;
  estado: string;
  fechaAdquisicion: string;
  imagenURL: string;
}

interface FormularioRegistroProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitStatus?: {
    success: boolean;
    message: string;
  } | null;
  resetForm: boolean; // Nueva prop para indicar cuando se debe resetear
}

const FormularioRegistro: React.FC<FormularioRegistroProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting = false,
  submitStatus = null,
  resetForm = false, // Valor por defecto
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Efecto para resetear los errores y campos tocados cuando se limpia el formulario
  useEffect(() => {
    if (resetForm) {
      setErrors({});
      setTouched({});
    }
  }, [resetForm]);

  const validateField = (name: string, value: string) => {
    if (!touched[name]) return "";

    if (!value.trim()) {
      return "Este campo es requerido";
    }

    return "";
  };

  useEffect(() => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "imagenURL" && key !== "ubicacion") {
        newErrors[key] = validateField(key, formData[key as keyof FormData]);
      }
    });
    setErrors(newErrors);
  }, [formData, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => !error) &&
      Object.values(touched).some((t) => t)
    );
  };

  return (
    <div className="registro-formulario">
      <h1>Registrar máquina</h1>
      {submitStatus && (
        <div
          className={`submit-status ${
            submitStatus.success ? "success" : "error"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Marca*:
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            onBlur={() => handleBlur("marca")}
            className={errors.marca ? "error-border" : ""}
            required
          />
          {errors.marca && <div className="error-message">{errors.marca}</div>}
        </label>

        <label>
          Modelo*:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            onBlur={() => handleBlur("modelo")}
            className={errors.modelo ? "error-border" : ""}
            required
          />
          {errors.modelo && (
            <div className="error-message">{errors.modelo}</div>
          )}
        </label>

        <label>
          Grupo Muscular*:
          <select
            name="grupMuscular"
            value={formData.grupMuscular}
            onChange={handleChange}
            onBlur={() => handleBlur("grupMuscular")}
            className={errors.grupMuscular ? "error-border" : ""}
            required
          >
            <option value="">Seleccione...</option>
            <option value="Pierna">Pierna</option>
            <option value="Brazo">Brazo</option>
            <option value="Espalda">Espalda</option>
            <option value="Pecho">Pecho</option>
            <option value="Abdomen">Abdomen</option>
          </select>
          {errors.grupMuscular && (
            <div className="error-message">{errors.grupMuscular}</div>
          )}
        </label>

        <label>
          Estado*:
          <select
            name="estado"
            value={formData.estado}
            onChange={(e) => {
              handleChange(e);
              handleBlur("estado");
            }}
            onBlur={() => handleBlur("estado")}
            className={errors.estado ? "error-border" : ""}
            required
          >
            <option value="">Seleccione un estado...</option>
            <option value="Operativa">Operativa</option>
            <option value="Inactivo">Inactivo</option>
            <option value="Mantenimiento">En mantenimiento</option>
          </select>
          {errors.estado && (
            <div className="error-message">{errors.estado}</div>
          )}
        </label>

        <label>
          Fecha de Adquisición*:
          <input
            type="date"
            name="fechaAdquisicion"
            value={formData.fechaAdquisicion}
            onChange={handleChange}
            onBlur={() => handleBlur("fechaAdquisicion")}
            className={errors.fechaAdquisicion ? "error-border" : ""}
            required
          />
          {errors.fechaAdquisicion && (
            <div className="error-message">{errors.fechaAdquisicion}</div>
          )}
        </label>

        <label>
          Imagen URL:
          <input
            type="text"
            name="imagenURL"
            value={formData.imagenURL}
            onChange={handleChange}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting || !isFormValid()}
          className={isSubmitting || !isFormValid() ? "disabled-button" : ""}
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default FormularioRegistro;
