// Import css files
import "../styles/styles.css";

// Import lazysizes from lazy loading
import "lazysizes";

// Import JS files
import MobileMenu from "./modules/MobileMenu";
import RevealOnSCroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

// Accept the hot update if it makes sense (updates on the fly)
if (module.hot) {
  module.hot.accept();
}

/* === This is where the functionality starts === */

/* - Mobile menu - */
new MobileMenu();

/* - Reveal contents on scroll - */
new RevealOnSCroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnSCroll(document.querySelectorAll(".testimonial"), 60);

/* - Sticky header on scroll on desktop - */
new StickyHeader();

/* - Modal - */
// Load in the modal code(js file) whenever it's needed(when the buttons to open modal are clicked)
let modal;
document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();

    if (typeof modal == "undefined") {
      // If the modal instance was never called
      import(/* webpackChunkName: "modal" */ "./modules/Modal")
        .then(res => {
          modal = new res.default(); // Create a new instance of the modal Class
          setTimeout(() => modal.openTheModal(), 20);
        })
        .catch(() => console.log("There was a problem"));
    } else {
      modal.openTheModal();
    }
  });
});
