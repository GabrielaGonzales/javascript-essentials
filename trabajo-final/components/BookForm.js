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
    <form id="book-form" data-book-id="${book.id || ""}" autocomplete="off">
      <h2>${book.id ? "Editar libro" : "Nuevo libro"}</h2>

      <label>Titulo</label>
      <input id="title" name="title" value="${book.title || ""}" required />

      <label>Descripcion</label>
      <textarea id="description" name="description" required>${book.description || ""}</textarea>

      <label>Autor</label>
      <input id="author" name="author" value="${book.author || ""}" required />

      <label>Categoria</label>
      <input id="category" name="category" value="${book.category || ""}" required />

      <label>Idioma</label>
      <input id="language" name="language" value="${book.language || ""}" required />
      <br/>

      <label>Anio</label>
      <input id="year" name="year" type="number" min="0" value="${book.year || ""}" required />
      <br/>

      <label>Editorial</label>
      <input id="publisher" name="publisher" value="${book.publisher || ""}" required />
      <br/>

      <label>Precio</label>
      <input id="price" name="price" type="number" min="0" value="${book.price || ""}" required />
      <br/>

      <label>Moneda</label>
      <select id="currency" name="currency">
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
