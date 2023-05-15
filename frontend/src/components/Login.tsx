import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Login.css';
import logo from '../logo.png'
import {toastConfig} from "../hooks/toastConfig";
import {toast} from "react-toastify";

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export default function Login(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!username || !password) {
            toast.error("Please fill in all fields", toastConfig);
            return;
        }
        props.onLogin(username, password)
            .then(() => {
                navigate("/");
            })
            .catch((r) => {
                console.log("FEHLER: " + r)
                toast.error("Couldn't login " + r, toastConfig)
            });
    }

    return (
        <div className="login-page">
            <img src={logo} className="logo" alt="Fleetgrid"/>
            <div className="box">
                <form onSubmit={onSubmit}>
                    <input value={username} placeholder="Username" type="text"
                           onChange={e => setUsername(e.target.value)}/>
                    <input value={password} placeholder="Password" type="password"
                           onChange={e => setPassword(e.target.value)}/>
                    <button type="submit" className="button">Login</button>
                </form>
            </div>
        </div>
    )
}
