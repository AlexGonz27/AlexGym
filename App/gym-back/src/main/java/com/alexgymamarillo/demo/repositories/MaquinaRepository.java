package com.alexgymamarillo.demo.repositories;

import com.alexgymamarillo.demo.entities.Maquina;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaquinaRepository extends JpaRepository<Maquina, Integer> {
}