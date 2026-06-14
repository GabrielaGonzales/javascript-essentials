import { api } from "../api.js";
import { store } from "../store.js";
import { navigateTo } from "../router.js";

export function Register() {
  setTimeout(() => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const response = await api.register({
          fullName: document.getElementById("fullName").value,
          password: document.getElementById("password").value,
          email: document.getElementById("email").value,
          age: Number(document.getElementById("age").value),
          address: document.getElementById("address").value,
          phone: document.getElementById("phone").value
        });

        store.setSession(response.data);
        navigateTo("/manage");
      } catch (error) {
        store.setError(error.message);
        document.getElementById("app").innerHTML = Register();
      }
    });
  });

  return `
    <h1>Registro</h1>
    ${store.state.error ? `<p class="error">${store.state.error}</p>` : ""}
    <form id="register-form">
      <label>Nombre completo</label>
      <input id="fullName" required />

      <label>Clave</label>
      <input id="password" type="password" required />

      <label>Email</label>
      <input id="email" type="email" required />

      <label>Edad</label>
      <input id="age" type="number" min="1" required />

      <label>Direccion</label>
      <input id="address" required />

      <label>Telefono</label>
      <input id="phone" required />

      <button>Crear cuenta</button>
    </form>
  `;
}
