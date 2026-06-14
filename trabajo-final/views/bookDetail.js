import { api } from "../api.js";
import { store } from "../store.js";

let currentId = null;

export function BookDetail(id) {
  setTimeout(async () => {
    if (currentId === id && store.state.selectedBook) return;
    currentId = id;

    try {
      const response = await api.getBook(id);
      store.setSelectedBook(response.data);
      document.getElementById("app").innerHTML = BookDetail(id);
    } catch (error) {
      store.setError(error.message);
      document.getElementById("app").innerHTML = BookDetail(id);
    }
  });

  const book = store.state.selectedBook;

  if (store.state.error) {
    return `<p class="error">${store.state.error}</p>`;
  }

  if (!book || String(book.id) !== String(id)) {
    return "<p>Cargando libro...</p>";
  }

  return `
    <article class="card">
      <h1>${book.title}</h1>
      <p>${book.description}</p>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Categoria:</strong> ${book.category}</p>
      <p><strong>Idioma:</strong> ${book.language}</p>
      <p><strong>Anio:</strong> ${book.year}</p>
      <p><strong>Editorial:</strong> ${book.publisher}</p>
      <p class="price">${book.currency} ${Number(book.price).toFixed(2)}</p>
    </article>
  `;
}
