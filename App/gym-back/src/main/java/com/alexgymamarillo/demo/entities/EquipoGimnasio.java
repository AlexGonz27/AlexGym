package com.alexgymamarillo.demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class EquipoGimnasio {

    @Id
    private String serial;

    private String nombre;
    private String modelo;
    private String estado;
    private String imagen;
    private Double peso;
    private LocalDate fechaAdquisicion;

    @ManyToOne
    @JoinColumn(name = "tipo_equipo_id")
    private TipoEquipo tipoEquipo;

    @ManyToOne
    @JoinColumn(name = "zona_id")
    private Zona zona;

    @ManyToMany
    @JoinTable(
        name = "equipo_grupo_muscular",
        joinColumns = @JoinColumn(name = "equipo_serial"),
        inverseJoinColumns = @JoinColumn(name = "grupo_muscular_id")
    )
    private List<GrupoMuscular> gruposMusculares = new ArrayList<>();

    @OneToMany(mappedBy = "equipo", cascade = CascadeType.ALL)
    private List<Reporte> reportes = new ArrayList<>();

    // Constructor vacío
    public EquipoGimnasio() {
    }

    // Getters y setters

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public LocalDate getFechaAdquisicion() {
        return fechaAdquisicion;
    }

    public void setFechaAdquisicion(LocalDate fechaAdquisicion) {
        this.fechaAdquisicion = fechaAdquisicion;
    }

    public TipoEquipo getTipoEquipo() {
        return tipoEquipo;
    }

    public void setTipoEquipo(TipoEquipo tipoEquipo) {
        this.tipoEquipo = tipoEquipo;
    }

    public Zona getZona() {
        return zona;
    }

    public void setZona(Zona zona) {
        this.zona = zona;
    }

    public List<GrupoMuscular> getGruposMusculares() {
        return gruposMusculares;
    }

    public void setGruposMusculares(List<GrupoMuscular> gruposMusculares) {
        this.gruposMusculares = gruposMusculares;
    }

    public List<Reporte> getReportes() {
        return reportes;
    }

    public void setReportes(List<Reporte> reportes) {
        this.reportes = reportes;
    }
}