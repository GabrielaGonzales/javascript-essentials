import { Home } from "./views/home.js";
import { Login } from "./views/login.js";
import { Register } from "./views/register.js";
import { Books } from "./views/books.js";
import { BookDetail } from "./views/bookDetail.js";
import { ManageBooks } from "./views/manageBooks.js";

const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
  "/books": Books,
  "/manage": ManageBooks
};

export function router() {
  const path = window.location.pathname;
  const bookDetailMatch = path.match(/^\/books\/(\d+)$/);
  const view = bookDetailMatch
    ? () => BookDetail(bookDetailMatch[1])
    : routes[path] || (() => "<h1>404</h1>");

  document.getElementById("app").innerHTML = view();
}

export function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
