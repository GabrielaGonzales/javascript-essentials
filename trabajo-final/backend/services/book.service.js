let books = [
  {
    id: 1,
    title: "JavaScript Essentials",
    description: "Guia practica para aprender fundamentos modernos de JavaScript.",
    author: "Laura Medina",
    category: "Programacion",
    language: "Espanol",
    year: 2025,
    publisher: "Tech Books",
    price: 32,
    currency: "USD"
  },
  {
    id: 2,
    title: "Node para APIs",
    description: "Construccion de servicios backend con rutas, controladores y servicios.",
    author: "Carlos Rojas",
    category: "Backend",
    language: "Espanol",
    year: 2024,
    publisher: "Codigo Press",
    price: 45,
    currency: "USD"
  },
  {
    id: 3,
    title: "Single Page Apps",
    description: "Patrones simples de navegacion, componentes y estado en el navegador.",
    author: "Marta Salas",
    category: "Frontend",
    language: "Espanol",
    year: 2026,
    publisher: "Frontend Lab",
    price: 38,
    currency: "USD"
  }
];

export async function getAllBooks(search = "") {
  const normalizedSearch = search.toLowerCase().trim();

  if (!normalizedSearch) {
    return books;
  }

  return books.filter(book => {
    return [
      book.title,
      book.description,
      book.author,
      book.category,
      book.language,
      book.publisher,
      String(book.year),
      book.currency
    ].some(value => value.toLowerCase().includes(normalizedSearch));
  });
}

export async function getBookById(id) {
  return books.find(book => book.id === Number(id));
}

export async function createBook(data) {
  const book = {
    id: Date.now(),
    ...data,
    year: Number(data.year),
    price: Number(data.price)
  };

  books.push(book);
  return book;
}

export async function updateBook(id, data) {
  const index = books.findIndex(book => book.id === Number(id));

  if (index === -1) return null;

  books[index] = {
    ...books[index],
    ...data,
    year: Number(data.year),
    price: Number(data.price)
  };

  return books[index];
}

export async function deleteBook(id) {
  const index = books.findIndex(book => book.id === Number(id));

  if (index === -1) return null;

  const removed = books.splice(index, 1);
  return removed[0];
}
