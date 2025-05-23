package com.universidad.service;

import com.universidad.dto.InscripcionDTO;
import java.util.List;

public interface IInscripcionService {
    InscripcionDTO crearInscripcion(InscripcionDTO inscripcionDTO);

    InscripcionDTO obtenerInscripcionPorId(Long id);

    List<InscripcionDTO> obtenerTodasInscripciones();

    InscripcionDTO actualizarInscripcion(Long id, InscripcionDTO inscripcionDTO);

    void eliminarInscripcion(Long id);

    List<InscripcionDTO> obtenerInscripcionesPorEstudiante(Long estudianteId);

    List<InscripcionDTO> obtenerInscripcionesPorMateria(Long materiaId);
}
