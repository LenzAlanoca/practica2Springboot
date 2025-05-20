package com.universidad.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InscripcionDTO {
    private Long id;
    private Long estudianteId;
    private Long materiaId;
    private LocalDate fechaInscripcion;
    private boolean activa;
}
