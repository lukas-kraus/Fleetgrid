import {Driver} from "../../model/Driver";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";
import {wait} from "@testing-library/user-event/dist/utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";

type Props = {
    editDriver: (newDriver: Driver) => void
}

export default function EditDriver(props: Props) {

    const initialState: Driver = {
        id: "",
        lastname: "",
        firstname: ""
    }

    const [driver, setDriver] = useState<Driver>(initialState)
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadDriverById(id);
        }
        // eslint-disable-next-line
    }, []);

    function loadDriverById(id: string) {
        axios.get('/api/driver/' + id)
            .then((response) => {
                setDriver(response.data)
            })
            .catch(() => {
                toast.error("Couldn't find driver", toastConfig)
                wait(500).then(() => navigate('/drivers/'))
            })
    }

    function onSaveDriver(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (id) {
            props.editDriver(driver);
            toast.success(driver.lastname + ' ' + driver.firstname + ' was successfully updated', toastConfig);
            wait(500).then(() => navigate(`/drivers/${driver.id}`))
        }
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setDriver({
                ...driver,
                id: id,
                [targetName]: value,
            });
        }
    }

    return (
        <div>
            {driver ? (
                <>
                    <h1>
                        <span>
                            <Link to="/cars">Cars</Link>
                            <ArrowForwardIosIcon/>
                            <Link to={`/drivers/${driver.id}`}>{driver.lastname} {driver.firstname}</Link>
                            <ArrowForwardIosIcon/>
                        </span>
                        Edit
                    </h1>
                    <form onSubmit={onSaveDriver}>
                        <input type="text"
                               name="lastname"
                               value={driver.lastname}
                               placeholder={driver.lastname}
                               onChange={onChange}
                        />
                        <input type="text"
                               name="firstname"
                               value={driver.firstname}
                               placeholder={driver.firstname}
                               onChange={onChange}
                        />
                        <button className="button">Update</button>
                    </form>
                </>
            ) : (
                <h1>Loading driver ...</h1>
            )}
        </div>
    );
}
