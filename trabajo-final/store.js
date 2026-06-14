export const store = {
  state: {
    books: [],
    search: "",
    selectedBook: null,
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
    message: "",
    error: ""
  },

  listeners: [],

  subscribe(fn) {
    this.listeners.push(fn);
  },

  notify() {
    this.listeners.forEach(fn => fn());
  },

  setBooks(books) {
    this.state.books = books;
    this.notify();
  },

  setSearch(search) {
    this.state.search = search;
  },

  setSelectedBook(book) {
    this.state.selectedBook = book;
    this.notify();
  },

  setSession(session) {
    this.state.token = session.token;
    this.state.user = session.user;
    localStorage.setItem("token", session.token);
    localStorage.setItem("user", JSON.stringify(session.user));
    this.notify();
  },

  clearSession() {
    this.state.token = null;
    this.state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.notify();
  },

  setMessage(message) {
    this.state.message = message;
    this.state.error = "";
    this.notify();
  },

  setError(error) {
    this.state.error = error;
    this.state.message = "";
    this.notify();
  }
};
