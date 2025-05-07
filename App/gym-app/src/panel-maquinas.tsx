import React, { useState } from "react";
import "./panel-maquinas.css";

interface Maquina {
  id: number;
  modelo: string;
  marca: string;
  grupoMuscular: string;
  estado: "Operativa" | "Mantenimiento" | "Inactiva";
  imagen: string;
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
  // Datos de las máquinas movidos fuera del componente para evitar recreación en cada render
  const maquinasData: Maquina[] = [
    {
      id: 1,
      modelo: "RX-500",
      marca: "TechGym",
      grupoMuscular: "Piernas",
      estado: "Operativa",
      imagen:
        "https://m.media-amazon.com/images/I/712EtG-7MLL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 2,
      modelo: "Force-2000",
      marca: "LifeFitness",
      grupoMuscular: "Brazos",
      estado: "Mantenimiento",
      imagen:
        "https://www.mundofitness.es/media/catalog/product/cache/5e0f94407d19dc82acabf59fa3abc631/0/2/02.jpg",
    },
    {
      id: 3,
      modelo: "Force-2000",
      marca: "LifeFitness",
      grupoMuscular: "Brazos",
      estado: "Inactiva",
      imagen:
        "https://www.mundofitness.es/media/catalog/product/cache/5e0f94407d19dc82acabf59fa3abc631/0/2/02.jpg",
    },
    {
      id: 4,
      modelo: "Force-2000",
      marca: "LifeFitness",
      grupoMuscular: "Brazos",
      estado: "Inactiva",
      imagen:
        "https://www.mundofitness.es/media/catalog/product/cache/5e0f94407d19dc82acabf59fa3abc631/0/2/02.jpg",
    },
    // Puedes agregar más máquinas aquí
  ];

  const [maquinasFiltradas, setMaquinasFiltradas] =
    useState<Maquina[]>(maquinasData);

  const filtrarPorEstado = (estado: string) => {
    if (estado === "todas") {
      setMaquinasFiltradas(maquinasData);
    } else {
      setMaquinasFiltradas(
        maquinasData.filter((m) => m.estado.toLowerCase() === estado)
      );
    }
  };

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

  return (
    <div className="panel-maquinas-container">
      <FiltroEstados onFiltrar={filtrarPorEstado} />

      <div className="maquinas-grid">
        {maquinasFiltradas.map((maquina) => (
          <div key={maquina.id} className="maquina-card">
            <div className="maquina-imagen-container">
              <img
                src={maquina.imagen}
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
                  <span className="detail-label">Grupo Muscular:</span>{" "}
                  {maquina.grupoMuscular}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanelMaquinas;
