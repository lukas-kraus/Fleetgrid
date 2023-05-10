import logo from '../logo.png'
import './Header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";

type Props = {
    onLogout: () => Promise<void>
    user: string | undefined
};

export default function Header(props: Props) {

    const [, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    function logoutUser() {
        props
            .onLogout()
            .then(() => {
                setIsLoggedIn(false);
                navigate("/login");
            })
    }

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
                    <AccountCircleIcon/> <span>{props.user}</span>
                    <Link to="#" onClick={logoutUser} className="logout">Logout?</Link>
                </NavLink>
            </div>
        </header>
    )
}