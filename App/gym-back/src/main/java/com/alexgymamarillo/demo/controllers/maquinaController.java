package com.alexgymamarillo.demo.controllers;

import com.alexgymamarillo.demo.entities.Maquina;
import com.alexgymamarillo.demo.services.MaquinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173") 
@RequestMapping("/api/maquinas")
public class maquinaController { // Cambiado a mayúscula (convención Java)

    @Autowired
    private MaquinaService maquinaService;

    // Obtener todas las máquinas
    @GetMapping
    public List<Maquina> getAllMaquinas() {
        return maquinaService.findAll();
    }

    // O alternativamente si quieres usar "/crear" en la ruta:
    @PostMapping("/crear")
    public ResponseEntity<Maquina> crearMaquinaConRuta(@RequestBody Maquina maquina) {
        Maquina nuevaMaquina = maquinaService.save(maquina);
        return ResponseEntity.ok(nuevaMaquina);
    }

    // Obtener máquina por ID
    @GetMapping("/{id}")
    public ResponseEntity<Maquina> getMaquinaById(@PathVariable Integer id) {
        Optional<Maquina> maquina = maquinaService.findById(id);
        return maquina.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }
    // Actualizar máquina
    @PutMapping("/{id}")
    public ResponseEntity<Maquina> updateMaquina(@PathVariable Integer id, @RequestBody Maquina maquinaDetails) {
        Optional<Maquina> maquina = maquinaService.findById(id);
        if (maquina.isPresent()) {
            Maquina updatedMaquina = maquina.get();
            updatedMaquina.setNombre(maquinaDetails.getNombre());
            updatedMaquina.setModelo(maquinaDetails.getModelo());
            updatedMaquina.setFechaAdquisicion(maquinaDetails.getFechaAdquisicion());
            updatedMaquina.setEstado(maquinaDetails.getEstado());
            return ResponseEntity.ok(maquinaService.save(updatedMaquina));
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar máquina
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaquina(@PathVariable Integer id) {
        maquinaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}