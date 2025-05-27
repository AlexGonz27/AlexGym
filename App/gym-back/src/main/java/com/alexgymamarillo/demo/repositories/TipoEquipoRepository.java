package com.alexgymamarillo.demo.repositories;

import com.alexgymamarillo.demo.entities.TipoEquipo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TipoEquipoRepository extends JpaRepository<TipoEquipo, Long> {
}