import logo from '../logo.png'
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import {toastConfig} from "../hooks/toastConfig";
import {User} from "../model/User";

type Props = {
    onLogout: () => Promise<void>
    userDetails: User | undefined
}

export default function Header(props: Props) {

    const [, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            await props.onLogout();
            setIsLoggedIn(false);
            navigate("/login");
            toast.success("Successfully logged out!", toastConfig)
        } catch (r) {
            console.error(r);
            toast.error("Couldn't log out: " + r, toastConfig)
        }
    }

    return (
        <header>
            <NavLink to="/" className="logo">
                <img src={logo}
                     className="logo"
                     alt="Fleetlink"/>
            </NavLink>
            <div className="separator"></div>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cars">Cars</NavLink>
            <NavLink to="/drivers">Drivers</NavLink>
            <NavLink to="/account">Account</NavLink>
            <div className="user">
                <NavLink to="#">
                    <AccountCircleIcon/> <span>{props.userDetails?.firstname}</span>
                    <Link to="#" onClick={logoutUser} className="logout">Logout?</Link>
                </NavLink>
            </div>
        </header>
    )
}