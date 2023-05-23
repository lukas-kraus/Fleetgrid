import {Link, useNavigate} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {NewDriver} from "../../model/Driver";
import React, {FormEvent, useState} from "react";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
    addDriver: (newDriver: NewDriver) => void;
};

export default function AddDriver(props: Props) {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [street, setStreet] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [country, setCountry] = useState<string>("");

    const navigate = useNavigate();

    function onSaveDriver(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newDriver: NewDriver = {
            firstname: firstname,
            lastname: lastname,
            birthday: birthday ? birthday.toISOString() : "",
            address: {
                street: street,
                city: city,
                postalCode: postalCode,
                country: country,
            },
        };

        props.addDriver(newDriver);

        navigate("/drivers");
        toast.success("Driver was successfully added", toastConfig);
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
                <input
                    type="text"
                    value={lastname}
                    placeholder="Last name"
                    required
                    onChange={(event) => {
                        setLastname(event.target.value);
                    }}
                />
                <input
                    type="text"
                    value={firstname}
                    placeholder="First name"
                    required
                    onChange={(event) => {
                        setFirstname(event.target.value);
                    }}
                />
                <DatePicker
                    placeholderText="Date of birth"
                    dateFormat="dd/MM/yyyy"
                    selected={birthday}
                    onChange={(date) => setBirthday(date)}
                />
                <input
                    type="text"
                    value={street}
                    placeholder="Street"
                    required
                    onChange={(event) => {
                        setStreet(event.target.value);
                    }}
                />
                <input
                    type="text"
                    value={city}
                    placeholder="City"
                    required
                    onChange={(event) => {
                        setCity(event.target.value);
                    }}
                />
                <input
                    type="text"
                    value={postalCode}
                    placeholder="Postal code"
                    required
                    onChange={(event) => {
                        setPostalCode(event.target.value);
                    }}
                />
                <input
                    type="text"
                    value={country}
                    placeholder="Country"
                    required
                    onChange={(event) => {
                        setCountry(event.target.value);
                    }}
                />
                <button className="button">Add Driver</button>
            </form>
        </div>
    );
}
