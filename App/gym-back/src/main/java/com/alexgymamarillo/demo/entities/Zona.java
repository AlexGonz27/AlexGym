package com.alexgymamarillo.demo.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Zona {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @OneToMany(mappedBy = "zona")
    private List<EquipoGimnasio> equipos = new ArrayList<>();

    public Zona() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<EquipoGimnasio> getEquipos() {
        return equipos;
    }

    public void setEquipos(List<EquipoGimnasio> equipos) {
        this.equipos = equipos;
    }
}
