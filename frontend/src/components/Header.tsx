import logo from '../logo.png'
import './Header.css';
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <NavLink to="/"><img src={logo} className="logo" alt="Fleetlink"/></NavLink>
            <NavLink to="/cars">All Cars</NavLink>
        </header>
    )
}