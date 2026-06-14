import { api } from "../api.js";
import { store } from "../store.js";
import { BookList } from "../components/BookList.js";

let isSubscribed = false;
let didLoadBooks = false;

export function Books() {
  if (!isSubscribed) {
    isSubscribed = true;
    store.subscribe(() => {
      if (window.location.pathname === "/books") {
        document.getElementById("app").innerHTML = Books();
      }
    });
  }

  setTimeout(() => {
    const form = document.getElementById("search-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const search = document.getElementById("search").value.trim();
      store.setSearch(search);

      try {
        const response = await api.getBooks(search);
        store.setBooks(response.data);
      } catch (error) {
        store.setError(error.message);
      }
    });

    if (!didLoadBooks) {
      didLoadBooks = true;
      form.dispatchEvent(new Event("submit"));
    }
  });

  return `
    <h1>Libros</h1>
    <form id="search-form">
      <input
        id="search"
        value="${store.state.search}"
        placeholder="Buscar por titulo, autor, categoria, editorial, idioma o anio"
      />
      <button>Buscar</button>
    </form>
    ${store.state.error ? `<p class="error">${store.state.error}</p>` : ""}
    ${BookList(store.state.books)}
  `;
}
