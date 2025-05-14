package com.alexgymamarillo.demo.entities;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "maquina")
public class Maquina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Maquina")
    private Integer id;
    
    @Column(name = "Marca", nullable = false)
    private String marca;
    
    @Column(name = "Modelo")
    private String modelo;
    
    @Column(name = "Grupo_muscular")
    private String grupMuscular;
    
    @Column(name = "Fecha_de_Adquisicion")
    private LocalDate fechaAdquisicion;
    
    @Column(name = "Estado")
    private String estado;

    @Column(name = "imagenURL")
    private String imagenURL;

    // Getters y Setters (IMPORTANTE)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getGrupMuscular() {
        return grupMuscular;
    }

    public void setGrupMuscular(String grupMuscular) {
        this.grupMuscular = grupMuscular;
    }

    public String getImagenURL() {
        return imagenURL;
    }

    public void setImagenURL(String imagenURL) {
        this.imagenURL = imagenURL;
    }

    public LocalDate getFechaAdquisicion() {
        return fechaAdquisicion;
    }

    public void setFechaAdquisicion(LocalDate fechaAdquisicion) {
        this.fechaAdquisicion = fechaAdquisicion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}