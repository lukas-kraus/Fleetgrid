import logo from '../logo.png'
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <NavLink to="/"><img src={logo} className="logo" alt="Fleetlink"/></NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cars">Cars</NavLink>
            <NavLink to="#">Trips</NavLink>
            <NavLink to="#">Driver</NavLink>
            <NavLink to="#">Settings</NavLink>
            <div className="user">
                <NavLink to="#">
                    <AccountCircleIcon/> <span>Lukas</span>
                </NavLink>
            </div>
        </header>
    )
}