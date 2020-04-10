// Import css files
import "../styles/styles.css";

// Import JS files
import MobileMenu from "./modules/MobileMenu";
import RevealOnSCroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

// Accept the hot update if it makes sense (updates on the fly)
if (module.hot) {
  module.hot.accept();
}

/* === This is where the functionality starts === */

// Mobile menu
const mobileMenu = new MobileMenu();

// Reveal contents on scroll
new RevealOnSCroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnSCroll(document.querySelectorAll(".testimonial"), 60);

// Sticky header on scroll on desktop
const stickyHeader = new StickyHeader();
