import React, { useState, useEffect } from "react";
import Modal from "./modal";
import "./panel-maquinas.css";

export interface Maquina {
  id: number;
  modelo: string;
  marca: string;
  grupMuscular: string;
  imagenURL: string;
  estado: "Operativa" | "Mantenimiento" | "Inactiva";
}

const FiltroEstados = ({
  onFiltrar,
}: {
  onFiltrar: (estado: string) => void;
}) => {
  const [filtroActivo, setFiltroActivo] = useState<string>("todas");

  const handleFiltro = (estado: string) => {
    setFiltroActivo(estado);
    onFiltrar(estado);
  };

  return (
    <div className="filtro-container">
      <button
        className={`filtro-btn ${filtroActivo === "todas" ? "activo" : ""}`}
        onClick={() => handleFiltro("todas")}
      >
        Todas
      </button>
      <button
        className={`filtro-btn ${filtroActivo === "operativa" ? "activo" : ""}`}
        onClick={() => handleFiltro("operativa")}
      >
        Operativas
      </button>
      <button
        className={`filtro-btn ${
          filtroActivo === "mantenimiento" ? "activo" : ""
        }`}
        onClick={() => handleFiltro("mantenimiento")}
      >
        Mantenimiento
      </button>
      <button
        className={`filtro-btn ${filtroActivo === "inactiva" ? "activo" : ""}`}
        onClick={() => handleFiltro("inactiva")}
      >
        Inactivas
      </button>
    </div>
  );
};


const PanelMaquinas: React.FC = () => {
  const [maquinasData, setMaquinasData] = useState<Maquina[]>([]);
  const [maquinasFiltradas, setMaquinasFiltradas] = useState<Maquina[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState<Maquina | null>(null);

  // Cargar datos desde la API
  useEffect(() => {
    const fetchMaquinas = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/maquinas");
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setMaquinasData(data);
        console.log(data);
        setMaquinasFiltradas(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("Error al cargar las máquinas:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaquinas();
  }, []);

  // Filtrar máquinas por estado
  const filtrarPorEstado = (estado: string) => {
    if (estado === "todas") {
      setMaquinasFiltradas(maquinasData);
    } else {
      setMaquinasFiltradas(
        maquinasData.filter((m) => m.estado.toLowerCase() === estado)
      );
    }
  };

  // Manejar apertura del modal
  const handleAbrirModal = (maquina: Maquina) => {
    setMaquinaSeleccionada(maquina);
    setIsModalOpen(true);
  };

  // Manejar guardado de cambios
  const handleGuardarCambios = async (maquinaActualizada: Maquina) => {
    try {
      // Actualizar en la API
      const response = await fetch(`http://localhost:8080/api/maquinas/${maquinaActualizada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maquinaActualizada),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la máquina');
      }

      // Actualizar el estado local
      const maquinasActualizadas = maquinasData.map(m => 
        m.id === maquinaActualizada.id ? maquinaActualizada : m
      );
      
      setMaquinasData(maquinasActualizadas);
      setMaquinasFiltradas(maquinasActualizadas);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Ocurrió un error al guardar los cambios");
    }
  };

  // Obtener clase CSS según estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Operativa":
        return "estado-operativa";
      case "Mantenimiento":
        return "estado-mantenimiento";
      default:
        return "estado-inactiva";
    }
  };

  if (isLoading) {
    return (
      <div className="panel-maquinas-container">
        <div className="loading-message">Cargando máquinas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel-maquinas-container">
        <div className="error-message">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="panel-maquinas-container">
      <FiltroEstados onFiltrar={filtrarPorEstado} />

      {maquinasFiltradas.length === 0 ? (
        <div className="no-results">No se encontraron máquinas</div>
      ) : (
        <div className="maquinas-grid">
          {maquinasFiltradas.map((maquina) => (
            <div key={maquina.id} className="maquina-card">
              <button
                className="card-button"
                onClick={() => handleAbrirModal(maquina)}
              >
                <div className="maquina-imagen-container">
                  <img
                    src={maquina.imagenURL}
                    alt={`Máquina ${maquina.modelo}`}
                    className="maquina-imagen"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                    }}
                    onLoad={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.objectFit =
                        img.naturalHeight > img.naturalWidth * 1.5
                          ? "contain"
                          : "cover";
                    }}
                  />
                </div>

                <div className="maquina-info-container">
                  <div className="maquina-header">
                    <h2 className="maquina-modelo">{maquina.modelo}</h2>
                    <span
                      className={`maquina-estado ${getEstadoColor(maquina.estado)}`}
                    >
                      {maquina.estado}
                    </span>
                  </div>

                  <div className="maquina-details">
                    <p>
                      <span className="detail-label">Marca:</span> {maquina.marca}
                    </p>
                    <p>
                      <span className="detail-label">Grupo Muscular:</span>{maquina.grupMuscular}
                    </p>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        maquina={maquinaSeleccionada}
        onSave={handleGuardarCambios}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PanelMaquinas;