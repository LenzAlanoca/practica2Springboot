const API_URL = "/api/auth";
let token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";
      } else {
        alert("Login fallido");
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const email = document.getElementById("email").value;
      const role = document.getElementById("role").value;

      // El backend espera 'roles' como un array/set
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, roles: [role] }),
      });

      if (res.ok) {
        alert("Usuario creado. Puedes iniciar sesión.");
        window.location.href = "index.html";
      } else {
        alert("Error al registrarse");
      }
    });
  }
});

function getSessionInfo() {
  fetch(`${API_URL}/session-info`, {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error("No autorizado");
      return res.json();
    })
    .then((data) => {
      document.getElementById(
        "user-info"
      ).innerText = `Usuario: ${data.username}, Rol: ${data.role}`;
    })
    .catch(() => {
      alert("Sesión no válida");
      window.location.href = "index.html";
    });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

function deleteAccount() {
  if (!confirm("¿Seguro que quieres eliminar tu cuenta?")) return;

  fetch(`${API_URL}/delete`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then((res) => {
    if (res.ok) {
      logout();
    } else {
      alert("Error al eliminar cuenta");
    }
  });
}
