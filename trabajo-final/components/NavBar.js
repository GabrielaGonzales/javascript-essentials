import { store } from "../store.js";
import { navigateTo } from "../router.js";

export function NavBar() {
  const authLinks = store.state.user
    ? `
      <a href="/manage" data-linked>Administrar libros</a>
      <button id="logout-btn">Salir (${store.state.user.email})</button>
    `
    : `
      <a href="/login" data-linked>Login</a>
      <a href="/register" data-linked>Registro</a>
    `;

  setTimeout(() => {
    const logoutButton = document.getElementById("logout-btn");
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        store.clearSession();
        navigateTo("/");
      });
    }
  });

  return `
    <nav>
      <a href="/" data-linked>Home</a>
      <a href="/books" data-linked>Libros</a>
      ${authLinks}
    </nav>
  `;
}
