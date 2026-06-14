import { router, navigateTo } from "./router.js";
import { NavBar } from "./components/NavBar.js";
import { store } from "./store.js";

function renderNavBar() {
  document.getElementById("navbar").innerHTML = NavBar();
}

store.subscribe(renderNavBar);
renderNavBar();

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-linked]");

  if (link) {
    e.preventDefault();
    navigateTo(link.href);
  }
});

window.addEventListener("popstate", router);

router();
