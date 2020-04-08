// Import css files
import "../styles/styles.css";

// Import JS files
import MobileMenu from "./modules/MobileMenu";

// Accept the hot update if it makes sense (updates on the fly)
if (module.hot) {
  module.hot.accept();
}

/* === This is where the functionality starts === */
const mobileMenu = new MobileMenu();
