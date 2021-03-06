import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import navListItems from "../../assets/config/headerNavItems";

import classes from "../../assets/scss/layout/_header.module.scss";

const HeaderNavbar = () => {
   const navItems = navListItems.map((item, index) => (
      <li key={index} className="d_none_w_s">
         <a href={item.href}>{item.text}</a>
      </li>
   ));

   return (
      <nav className="bg_dark_blue">
         <ul>
            <li>
               <FontAwesomeIcon className={classes.bars_icon} icon="fa-bars" />
               <span>All</span>
            </li>
            {navItems}
         </ul>
         <a href="/" className={classes.nav_right}>
            Shop Father's Day Gifts
         </a>
      </nav>
   );
};

export default HeaderNavbar;
