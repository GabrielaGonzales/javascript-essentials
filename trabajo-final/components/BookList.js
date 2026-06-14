export function BookList(books, showActions = false) {
  if (!books.length) {
    return "<p>No hay libros para mostrar.</p>";
  }

  const cards = books.map(book => `
    <article class="card">
      <h3>${book.title}</h3>
      <p class="muted">${book.author} | ${book.category} | ${book.language}</p>
      <p>${book.description}</p>
      <p>${book.publisher}, ${book.year}</p>
      <p class="price">${book.currency} ${Number(book.price).toFixed(2)}</p>
      <div class="actions">
        <a href="/books/${book.id}" data-linked>Ver detalle</a>
        ${showActions ? `
          <button data-edit-book="${book.id}">Editar</button>
          <button class="danger" data-delete-book="${book.id}">Eliminar</button>
        ` : ""}
      </div>
    </article>
  `).join("");

  return `<section class="grid">${cards}</section>`;
}
