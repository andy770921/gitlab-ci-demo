import React from "react";
import { Link } from "react-router-dom";

const NavbarUi = () => {
    return (
        <nav className = "nav-wrapper blue lighten-3">
            <ul className = "flex-container-center">
                <li><Link className="black-text nav-font-size" to= "/">All</Link></li>
                <li><Link className="black-text nav-font-size" to= "/ongoing">Ongoing</Link></li>
                <li><Link className="black-text nav-font-size" to= "/finished">Finished</Link></li>
            </ul>
        </nav>
    );
}
export default NavbarUi;