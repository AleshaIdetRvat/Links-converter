import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({ logout }) => {
    console.log("__Header__", logout);
    return (
        <nav>
            <div className="nav-wrapper amber darken-3">
                <NavLink to="/" className="brand-logo left">
                    TooLLink
                </NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/links">My links</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create">Create</NavLink>
                    </li>
                    <li>
                        <button onClick={logout} className="app-header__btn">
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        // <header classNameName="app__header app-header">
        //     <div classNameName="app-header__logout">
        //
        //     </div>
        // </header>
    );
};

export default Header;
