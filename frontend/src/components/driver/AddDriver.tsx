import {Link, useNavigate} from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {NewDriver} from "../../model/Driver";
import {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";

type Props = {
    addDriver: (newDriver: NewDriver) => void
}

export default function AddDriver(props: Props) {
    const [firstname, setFirstname] = useState<string>("")
    const [lastname, setLastname] = useState<string>("")
    const navigate = useNavigate();

    function onSaveDriver(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newDriver: NewDriver = {firstname: firstname, lastname: lastname}

        props.addDriver(newDriver)

        navigate("/drivers");
        toast.success("Driver was successfully added", toastConfig)
    }

    return (
        <div>
            <h1>
                <span>
                    <Link to="/cars">Drivers</Link>
                    <ArrowForwardIosIcon/>
                </span>
                Add Driver
            </h1>
            <form onSubmit={onSaveDriver}>
                <input type="text"
                       value={lastname}
                       placeholder="Last name"
                       required
                       onChange={(event) => {
                           setLastname(event.target.value)
                       }}/>
                <input type="text"
                       value={firstname}
                       placeholder="First name"
                       required
                       onChange={(event) => {
                           setFirstname(event.target.value)
                       }}/>
                <button className="button">Add Driver</button>
            </form>
        </div>
    )
}

