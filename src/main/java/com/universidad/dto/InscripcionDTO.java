package com.universidad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionDTO {
    private Long id;
    @NotNull(message = "El estudiante es obligatorio")
    private Long estudianteId;
    @NotNull(message = "La materia es obligatoria")
    private Long materiaId;
    @NotNull(message = "La fecha de inscripción es obligatoria")
    private LocalDate fechaInscripcion;
    private boolean activa;
}
