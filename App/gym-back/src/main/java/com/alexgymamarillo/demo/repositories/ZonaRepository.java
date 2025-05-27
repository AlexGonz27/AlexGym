package com.alexgymamarillo.demo.repositories;

import com.alexgymamarillo.demo.entities.Zona;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ZonaRepository extends JpaRepository<Zona, Long> {
}