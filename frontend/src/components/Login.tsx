import {FormEvent, useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import './Login.css';
import logo from '../logo.png';
import backgroundVideo from '../images/video.mp4';
import {toastConfig} from "../hooks/toastConfig";
import {toast} from "react-toastify";

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export default function Login(props: Props) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Video playback failed: ", error);
            });
        }
    }, []);

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!username || !password) {
            toast.error("Please fill in all fields", toastConfig);
            return;
        }
        props.onLogin(username, password)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                console.error("Error logging in: ", error);
                toast.error("Couldn't login " + error, toastConfig);
            });
    }

    return (
        <div className="login-page">
            <video ref={videoRef} autoPlay loop muted>
                <source src={backgroundVideo} type="video/mp4"/>
            </video>
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
    );
}
