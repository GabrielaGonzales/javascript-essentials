import { api } from "../api.js";
import { store } from "../store.js";
import { BookForm } from "../components/BookForm.js";
import { BookList } from "../components/BookList.js";

let isSubscribed = false;
let editingBook = null;

function getBookFromForm(form) {
  const formData = new FormData(form);

  return {
    title: formData.get("title"),
    description: formData.get("description"),
    author: formData.get("author"),
    category: formData.get("category"),
    language: formData.get("language"),
    year: Number(formData.get("year")),
    publisher: formData.get("publisher"),
    price: Number(formData.get("price")),
    currency: formData.get("currency")
  };
}

export function ManageBooks() {
  if (!store.state.user) {
    return "<h1>Debes iniciar sesion para administrar libros.</h1>";
  }

  if (!isSubscribed) {
    isSubscribed = true;
    store.subscribe(() => {
      if (window.location.pathname === "/manage") {
        document.getElementById("app").innerHTML = ManageBooks();
      }
    });
  }

  setTimeout(async () => {
    const form = document.getElementById("book-form");
    const cancelButton = document.getElementById("cancel-edit");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        if (editingBook) {
          await api.updateBook(editingBook.id, getBookFromForm(form));
          editingBook = null;
          store.setMessage("Libro actualizado");
        } else {
          await api.createBook(getBookFromForm(form));
          store.setMessage("Libro creado");
        }

        const response = await api.getBooks();
        store.setBooks(response.data);
      } catch (error) {
        store.setError(error.message);
      }
    });

    cancelButton.addEventListener("click", () => {
      editingBook = null;
      document.getElementById("app").innerHTML = ManageBooks();
    });

    document.querySelectorAll("[data-edit-book]").forEach(button => {
      button.addEventListener("click", () => {
        editingBook = store.state.books.find(book => book.id === Number(button.dataset.editBook));
        document.getElementById("app").innerHTML = ManageBooks();
      });
    });

    document.querySelectorAll("[data-delete-book]").forEach(button => {
      button.addEventListener("click", async () => {
        try {
          await api.deleteBook(button.dataset.deleteBook);
          const response = await api.getBooks();
          store.setBooks(response.data);
          store.setMessage("Libro eliminado");
        } catch (error) {
          store.setError(error.message);
        }
      });
    });

    if (!store.state.books.length) {
      const response = await api.getBooks();
      store.setBooks(response.data);
    }
  });

  return `
    <h1>Administrar libros</h1>
    ${store.state.message ? `<p class="success">${store.state.message}</p>` : ""}
    ${store.state.error ? `<p class="error">${store.state.error}</p>` : ""}
    ${BookForm(editingBook || undefined)}
    ${BookList(store.state.books, true)}
  `;
}
