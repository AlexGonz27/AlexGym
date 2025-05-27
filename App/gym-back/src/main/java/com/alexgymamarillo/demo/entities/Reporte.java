package com.alexgymamarillo.demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Reporte {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descripcion;
    private LocalDate fechaReporte;

    @ManyToOne
    @JoinColumn(name = "equipo_serial")
    private EquipoGimnasio equipo;

    public Reporte() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getFechaReporte() {
        return fechaReporte;
    }

    public void setFechaReporte(LocalDate fechaReporte) {
        this.fechaReporte = fechaReporte;
    }

    public EquipoGimnasio getEquipo() {
        return equipo;
    }

    public void setEquipo(EquipoGimnasio equipo) {
        this.equipo = equipo;
    }
}
