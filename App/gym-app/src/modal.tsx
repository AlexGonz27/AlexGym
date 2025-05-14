import React from "react";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-parent">
      <div className="modal-content">
        <div className="modal-div1">Información de Máquina</div>

        <div className="modal-div3">
          <div className="form-group">
            <label htmlFor="modelo">Modelo</label>
            <input type="text" id="modelo" defaultValue="RX-500" />
          </div>

          <div className="form-group">
            <label htmlFor="marca">Marca</label>
            <input type="text" id="marca" defaultValue="TechGym" />
          </div>

          <div className="form-group">
            <label htmlFor="grupo">Grupo Muscular</label>
            <select id="grupo" defaultValue="Piernas">
              <option value="Piernas">Piernas</option>
              <option value="Brazos">Brazos</option>
              <option value="Espalda">Espalda</option>
              <option value="Pecho">Pecho</option>
              <option value="Abdomen">Abdomen</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select id="estado" defaultValue="Operativa">
              <option value="Operativa">Operativa</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Inactiva">Inactiva</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="imagen">URL de Imagen</label>
            <input
              type="text"
              id="imagen"
              defaultValue="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas Adicionales</label>
            <textarea
              id="notas"
              rows={3}
              className="form-control"
              defaultValue="Máquina en buen estado"
            />
          </div>
        </div>

        <div className="modal-div4">
          <button className="action-button secondary-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="action-button primary-button">Guardar</button>
        </div>

        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
