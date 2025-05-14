package com.alexgymamarillo.demo.services;

import com.alexgymamarillo.demo.entities.Maquina;
import com.alexgymamarillo.demo.repositories.MaquinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaquinaService {
    @Autowired
    private MaquinaRepository maquinaRepository;

    public List<Maquina> findAll() {
        return maquinaRepository.findAll();
    }

    public Optional<Maquina> findById(Integer id) {
        return maquinaRepository.findById(id);
    }

    public Maquina save(Maquina maquina) {
        return maquinaRepository.save(maquina);
    }

    public void deleteById(Integer id) {
        maquinaRepository.deleteById(id);
    }
}