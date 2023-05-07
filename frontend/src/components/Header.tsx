import logo from '../logo.png'
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header>
            <NavLink to="/" className="logo"><img src={logo}
                                                  className="logo"
                                                  alt="Fleetlink"/></NavLink>
            <div className="separator"></div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cars">Cars</NavLink>
            <NavLink to="/trips">Trips</NavLink>
            <NavLink to="/driver">Driver</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            <div className="user">
                <NavLink to="#">
                    <AccountCircleIcon/> <span>Lukas</span>
                    <span className="logout">Logout?</span>
                </NavLink>
            </div>
        </header>
    )
}