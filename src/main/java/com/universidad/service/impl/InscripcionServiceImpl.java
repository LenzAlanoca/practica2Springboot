package com.universidad.service.impl;

import com.universidad.dto.InscripcionDTO;
import com.universidad.model.Inscripcion;
import com.universidad.model.Estudiante;
import com.universidad.model.Materia;
import com.universidad.repository.InscripcionRepository;
import com.universidad.repository.EstudianteRepository;
import com.universidad.repository.MateriaRepository;
import com.universidad.service.IInscripcionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InscripcionServiceImpl implements IInscripcionService {
    @Autowired
    private InscripcionRepository inscripcionRepository;
    @Autowired
    private EstudianteRepository estudianteRepository;
    @Autowired
    private MateriaRepository materiaRepository;

    private InscripcionDTO mapToDTO(Inscripcion inscripcion) {
        if (inscripcion == null)
            return null;
        return new InscripcionDTO(
                inscripcion.getId(),
                inscripcion.getEstudiante().getId(),
                inscripcion.getMateria().getId(),
                inscripcion.getFechaInscripcion(),
                inscripcion.isActiva());
    }

    @Override
    public InscripcionDTO crearInscripcion(InscripcionDTO dto) {
        Estudiante estudiante = estudianteRepository.findById(dto.getEstudianteId()).orElseThrow();
        Materia materia = materiaRepository.findById(dto.getMateriaId()).orElseThrow();
        Inscripcion inscripcion = new Inscripcion(null, estudiante, materia, dto.getFechaInscripcion(), true);
        return mapToDTO(inscripcionRepository.save(inscripcion));
    }

    @Override
    public InscripcionDTO obtenerInscripcionPorId(Long id) {
        return inscripcionRepository.findById(id).map(this::mapToDTO).orElse(null);
    }

    @Override
    public List<InscripcionDTO> obtenerTodasInscripciones() {
        return inscripcionRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public InscripcionDTO actualizarInscripcion(Long id, InscripcionDTO dto) {
        Inscripcion inscripcion = inscripcionRepository.findById(id).orElseThrow();
        if (dto.getEstudianteId() != null) {
            inscripcion.setEstudiante(estudianteRepository.findById(dto.getEstudianteId()).orElseThrow());
        }
        if (dto.getMateriaId() != null) {
            inscripcion.setMateria(materiaRepository.findById(dto.getMateriaId()).orElseThrow());
        }
        if (dto.getFechaInscripcion() != null) {
            inscripcion.setFechaInscripcion(dto.getFechaInscripcion());
        }
        inscripcion.setActiva(dto.isActiva());
        return mapToDTO(inscripcionRepository.save(inscripcion));
    }

    @Override
    public void eliminarInscripcion(Long id) {
        inscripcionRepository.deleteById(id);
    }

    @Override
    public List<InscripcionDTO> obtenerInscripcionesPorEstudiante(Long estudianteId) {
        return inscripcionRepository.findByEstudianteId(estudianteId).stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InscripcionDTO> obtenerInscripcionesPorMateria(Long materiaId) {
        return inscripcionRepository.findByMateriaId(materiaId).stream().map(this::mapToDTO)
                .collect(Collectors.toList());
    }
}
