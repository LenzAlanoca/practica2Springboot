package com.universidad.controller;

import com.universidad.dto.InscripcionDTO;
import com.universidad.service.IInscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/inscripciones")
public class InscripcionController {
    @Autowired
    private IInscripcionService inscripcionService;

    @PostMapping
    public ResponseEntity<InscripcionDTO> crear(@Valid @RequestBody InscripcionDTO dto) {
        return new ResponseEntity<>(inscripcionService.crearInscripcion(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public List<InscripcionDTO> listar() {
        return inscripcionService.obtenerTodasInscripciones();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionDTO> obtener(@PathVariable Long id) {
        InscripcionDTO dto = inscripcionService.obtenerInscripcionPorId(id);
        return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<InscripcionDTO> actualizar(@PathVariable Long id, @Valid @RequestBody InscripcionDTO dto) {
        return ResponseEntity.ok(inscripcionService.actualizarInscripcion(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        inscripcionService.eliminarInscripcion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/estudiante/{estudianteId}")
    public List<InscripcionDTO> porEstudiante(@PathVariable Long estudianteId) {
        return inscripcionService.obtenerInscripcionesPorEstudiante(estudianteId);
    }

    @GetMapping("/materia/{materiaId}")
    public List<InscripcionDTO> porMateria(@PathVariable Long materiaId) {
        return inscripcionService.obtenerInscripcionesPorMateria(materiaId);
    }
}
