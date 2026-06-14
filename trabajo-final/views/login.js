import { api } from "../api.js";
import { store } from "../store.js";
import { navigateTo } from "../router.js";

export function Login() {
  setTimeout(() => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const response = await api.login({
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        });

        store.setSession(response.data);
        navigateTo("/manage");
      } catch (error) {
        store.setError(error.message);
        document.getElementById("app").innerHTML = Login();
      }
    });
  });

  return `
    <h1>Login</h1>
    ${store.state.error ? `<p class="error">${store.state.error}</p>` : ""}
    <form id="login-form">
      <label>Email</label>
      <input id="email" type="email" required />

      <label>Clave</label>
      <input id="password" type="password" required />

      <button>Entrar</button>
    </form>
  `;
}
