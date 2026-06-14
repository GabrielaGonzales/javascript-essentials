export function BookList(books, showActions = false) {
  if (!books.length) {
    return "<p>No hay libros para mostrar.</p>";
  }

  const cards = books.map(book => `
    <article class="card">
      <h3>${book.title}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Categoria:</strong> ${book.category}</p>
      <p><strong>Idioma:</strong> ${book.language}</p>
      <p>${book.description}</p>
      <p><strong>Editorial:</strong> ${book.publisher}</p>
      <p><strong>Anio:</strong> ${book.year}</p>
      <p class="price">${book.currency} ${Number(book.price).toFixed(2)}</p>
      <div class="actions">
        <a href="/books/${book.id}" data-linked>Ver detalle</a>
        ${showActions ? `
          <button type="button" data-edit-book="${book.id}">Editar</button>
          <button type="button" class="danger" data-delete-book="${book.id}">Eliminar</button>
        ` : ""}
      </div>
    </article>
  `).join("");

  return `<section class="grid">${cards}</section>`;
}
