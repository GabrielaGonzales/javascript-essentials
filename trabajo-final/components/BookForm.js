const emptyBook = {
  title: "",
  description: "",
  author: "",
  category: "",
  language: "",
  year: "",
  publisher: "",
  price: "",
  currency: "USD"
};

export function BookForm(book = emptyBook) {
  return `
    <form id="book-form" data-book-id="${book.id || ""}">
      <h2>${book.id ? "Editar libro" : "Nuevo libro"}</h2>

      <label>Titulo</label>
      <input id="title" value="${book.title || ""}" required />

      <label>Descripcion</label>
      <textarea id="description" required>${book.description || ""}</textarea>

      <label>Autor</label>
      <input id="author" value="${book.author || ""}" required />

      <label>Categoria</label>
      <input id="category" value="${book.category || ""}" required />

      <label>Idioma</label>
      <input id="language" value="${book.language || ""}" required />

      <label>Anio</label>
      <input id="year" type="number" min="0" value="${book.year || ""}" required />

      <label>Editorial</label>
      <input id="publisher" value="${book.publisher || ""}" required />

      <label>Precio</label>
      <input id="price" type="number" min="0" step="0.01" value="${book.price || ""}" required />

      <label>Moneda</label>
      <select id="currency">
        <option value="USD" ${book.currency === "USD" ? "selected" : ""}>USD</option>
        <option value="BOB" ${book.currency === "BOB" ? "selected" : ""}>BOB</option>
        <option value="EUR" ${book.currency === "EUR" ? "selected" : ""}>EUR</option>
      </select>

      <div class="actions">
        <button>Guardar</button>
        <button type="button" id="cancel-edit">Cancelar</button>
      </div>
    </form>
  `;
}
