import { store } from "./store.js";

const API_URL = "/api";

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (store.state.token) {
    headers.Authorization = `Bearer ${store.state.token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Error en la solicitud");
  }

  return data;
}

export const api = {
  getBooks(search = "") {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return request(`/books${query}`);
  },

  getBook(id) {
    return request(`/books/${id}`);
  },

  createBook(book) {
    return request("/books", {
      method: "POST",
      body: JSON.stringify(book)
    });
  },

  updateBook(id, book) {
    return request(`/books/${id}`, {
      method: "PUT",
      body: JSON.stringify(book)
    });
  },

  deleteBook(id) {
    return request(`/books/${id}`, {
      method: "DELETE"
    });
  },

  register(user) {
    return request("/auth/register", {
      method: "POST",
      body: JSON.stringify(user)
    });
  },

  login(credentials) {
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    });
  }
};
