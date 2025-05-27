package com.alexgymamarillo.demo.repositories;

import com.alexgymamarillo.demo.entities.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReporteRepository extends JpaRepository<Reporte, Long> {
}
