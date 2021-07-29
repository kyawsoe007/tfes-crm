import React from "react";
import { NavLink } from "react-router-dom";

function MainMenu(props) {
  const { location, navLinks, resetSubLink } = props;
  return (
    <div className="horizontal-menu align-self-center">
      <ul className="list-unstyled nav">
        {navLinks.map((link, key) => (
          <li key={key} className="nav-item" onClick={() => resetSubLink()}>
            <NavLink
              to={link.url}
              className={
                "nav-link w-100 " +
                (location.pathname.includes(link.baseUrl) ? "active" : "")
              }
            >
              <span className="menu-title">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainMenu;
