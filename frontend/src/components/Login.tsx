import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

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
        <form onSubmit={onSubmit}>
            <input value={username} placeholder="username" type="text" onChange={e => setUsername(e.target.value)}/>
            <input value={password} placeholder="password" type="password" onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    )
}
