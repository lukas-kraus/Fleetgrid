import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import './Login.css';
import logo from '../logo.png'

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export default function Login(props: Props) {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        props.onLogin(username, password)
            .then(() => {
                navigate("/cars");
            })
            .catch((error) => {
                console.error(error);
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}
