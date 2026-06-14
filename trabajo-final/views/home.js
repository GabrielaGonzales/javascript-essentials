import { api } from "../api.js";
import { store } from "../store.js";
import { BookList } from "../components/BookList.js";

let isSubscribed = false;

export function Home() {
  if (!isSubscribed) {
    isSubscribed = true;
    store.subscribe(() => {
      if (window.location.pathname === "/") {
        document.getElementById("app").innerHTML = Home();
      }
    });
  }

  setTimeout(async () => {
    if (store.state.books.length) return;

    try {
      const response = await api.getBooks();
      store.setBooks(response.data.slice(0, 3));
    } catch (error) {
      store.setError(error.message);
    }
  });

  return `
    <h1>Tienda de Libros</h1>
    <p>Busca libros y revisa sus detalles. Solo los usuarios registrados pueden crear, editar o eliminar libros.</p>
    ${store.state.error ? `<p class="error">${store.state.error}</p>` : ""}
    <h2>Libros destacados</h2>
    ${BookList(store.state.books)}
  `;
}
