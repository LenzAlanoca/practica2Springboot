// CRUD de materias para dashboard
const MATERIAS_API = "/api/materias";

function cargarMaterias() {
  fetch(MATERIAS_API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((res) => res.json())
    .then((materias) => {
      const lista = document.getElementById("materias-list");
      lista.innerHTML = "";
      materias.forEach((m) => {
        lista.innerHTML += `
          <li>
            <b>${m.nombreMateria}</b> (${m.codigoUnico}) - Creditos: ${m.creditos}
            <button onclick="editarMateria(${m.id})">Editar</button>
            <button onclick="borrarMateria(${m.id})">Eliminar</button>
          </li>
        `;
      });
    });
}

function crearMateria() {
  const nombre = document.getElementById("nombreMateria").value;
  const codigo = document.getElementById("codigoUnico").value;
  const creditos = document.getElementById("creditos").value;
  fetch(MATERIAS_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      nombreMateria: nombre,
      codigoUnico: codigo,
      creditos: creditos,
    }),
  }).then((res) => {
    if (res.ok) cargarMaterias();
    else alert("Error al crear materia");
  });
}

function editarMateria(id) {
  fetch(`${MATERIAS_API}/${id}`)
    .then((res) => res.json())
    .then((materia) => {
      const nuevoNombre = prompt(
        "Nuevo nombre de la materia:",
        materia.nombreMateria
      );
      if (!nuevoNombre) return;
      const nuevoCodigo = prompt("Nuevo código único:", materia.codigoUnico);
      if (!nuevoCodigo) return;
      const nuevosCreditos = prompt("Nuevos créditos:", materia.creditos);
      if (!nuevosCreditos) return;
      fetch(`${MATERIAS_API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombreMateria: nuevoNombre,
          codigoUnico: nuevoCodigo,
          creditos: nuevosCreditos,
        }),
      }).then((res) => {
        if (res.ok) cargarMaterias();
        else alert("Error al actualizar materia");
      });
    });
}

function borrarMateria(id) {
  if (!confirm("¿Seguro que quieres eliminar esta materia?")) return;
  fetch(`${MATERIAS_API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((res) => {
    if (res.ok) cargarMaterias();
    else alert("Error al eliminar materia");
  });
}

// CRUD de estudiantes
const ESTUDIANTES_API = "/api/estudiantes";

function cargarEstudiantes() {
  fetch(ESTUDIANTES_API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((res) => res.json())
    .then((estudiantes) => {
      const lista = document.getElementById("estudiantes-list");
      lista.innerHTML = "";
      estudiantes.forEach((e) => {
        lista.innerHTML += `
          <li>
            <b>${e.nombre} ${e.apellido}</b> (${e.email})
            <button onclick="editarEstudiante(${e.id})">Editar</button>
            <button onclick="borrarEstudiante(${e.id})">Eliminar</button>
          </li>
        `;
      });
    });
}

function crearEstudiante() {
  const nombre = document.getElementById("nombreEstudiante").value;
  const apellido = document.getElementById("apellidoEstudiante").value;
  const email = document.getElementById("emailEstudiante").value;
  const fechaNacimiento = document.getElementById(
    "fechaNacimientoEstudiante"
  ).value;
  fetch(ESTUDIANTES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ nombre, apellido, email, fechaNacimiento }),
  }).then((res) => {
    if (res.ok) cargarEstudiantes();
    else alert("Error al crear estudiante");
  });
}

function editarEstudiante(id) {
  fetch(`${ESTUDIANTES_API}/${id}`)
    .then((res) => res.json())
    .then((estudiante) => {
      const nuevoNombre = prompt("Nuevo nombre:", estudiante.nombre);
      if (!nuevoNombre) return;
      const nuevoApellido = prompt("Nuevo apellido:", estudiante.apellido);
      if (!nuevoApellido) return;
      const nuevoEmail = prompt("Nuevo email:", estudiante.email);
      if (!nuevoEmail) return;
      const nuevaFecha = prompt(
        "Nueva fecha de nacimiento (yyyy-mm-dd):",
        estudiante.fechaNacimiento
      );
      if (!nuevaFecha) return;
      fetch(`${ESTUDIANTES_API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombre: nuevoNombre,
          apellido: nuevoApellido,
          email: nuevoEmail,
          fechaNacimiento: nuevaFecha,
        }),
      }).then((res) => {
        if (res.ok) cargarEstudiantes();
        else alert("Error al actualizar estudiante");
      });
    });
}

function borrarEstudiante(id) {
  if (!confirm("¿Seguro que quieres eliminar este estudiante?")) return;
  fetch(`${ESTUDIANTES_API}/${id}/baja`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: JSON.stringify({}),
  }).then((res) => {
    if (res.ok) cargarEstudiantes();
    else alert("Error al eliminar estudiante");
  });
}

// CRUD de inscripciones
const INSCRIPCIONES_API = "/api/inscripciones";

function cargarInscripciones() {
  fetch(INSCRIPCIONES_API, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((res) => res.json())
    .then((inscripciones) => {
      const lista = document.getElementById("inscripciones-list");
      lista.innerHTML = "";
      inscripciones.forEach((i) => {
        lista.innerHTML += `
          <li>
            Estudiante ID: ${i.estudianteId}, Materia ID: ${i.materiaId}, Fecha: ${i.fechaInscripcion}
            <button onclick="editarInscripcion(${i.id})">Editar</button>
            <button onclick="borrarInscripcion(${i.id})">Eliminar</button>
          </li>
        `;
      });
    });
}

function crearInscripcion() {
  const estudianteId = document.getElementById("estudianteIdInscripcion").value;
  const materiaId = document.getElementById("materiaIdInscripcion").value;
  const fechaInscripcion = document.getElementById("fechaInscripcion").value;
  fetch(INSCRIPCIONES_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ estudianteId, materiaId, fechaInscripcion }),
  }).then((res) => {
    if (res.ok) cargarInscripciones();
    else alert("Error al crear inscripción");
  });
}

function editarInscripcion(id) {
  fetch(`${INSCRIPCIONES_API}/${id}`)
    .then((res) => res.json())
    .then((inscripcion) => {
      const nuevoEstudianteId = prompt(
        "Nuevo ID de estudiante:",
        inscripcion.estudianteId
      );
      if (!nuevoEstudianteId) return;
      const nuevoMateriaId = prompt(
        "Nuevo ID de materia:",
        inscripcion.materiaId
      );
      if (!nuevoMateriaId) return;
      const nuevaFecha = prompt(
        "Nueva fecha de inscripción (yyyy-mm-dd):",
        inscripcion.fechaInscripcion
      );
      if (!nuevaFecha) return;
      fetch(`${INSCRIPCIONES_API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          estudianteId: nuevoEstudianteId,
          materiaId: nuevoMateriaId,
          fechaInscripcion: nuevaFecha,
        }),
      }).then((res) => {
        if (res.ok) cargarInscripciones();
        else alert("Error al actualizar inscripción");
      });
    });
}

function borrarInscripcion(id) {
  if (!confirm("¿Seguro que quieres eliminar esta inscripción?")) return;
  fetch(`${INSCRIPCIONES_API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((res) => {
    if (res.ok) cargarInscripciones();
    else alert("Error al eliminar inscripción");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("materias-list")) cargarMaterias();
  if (document.getElementById("estudiantes-list")) cargarEstudiantes();
  if (document.getElementById("inscripciones-list")) cargarInscripciones();
});
