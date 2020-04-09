// Import css files
import "../styles/styles.css";

// Import JS files
import MobileMenu from "./modules/MobileMenu";
import RevealOnSCroll from "./modules/RevealOnScroll";

// Accept the hot update if it makes sense (updates on the fly)
if (module.hot) {
  module.hot.accept();
}

/* === This is where the functionality starts === */
const mobileMenu = new MobileMenu();
new RevealOnSCroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnSCroll(document.querySelectorAll(".testimonial"), 60);
