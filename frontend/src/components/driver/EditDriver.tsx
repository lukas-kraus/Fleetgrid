import {Driver} from "../../model/Driver";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";
import {wait} from "@testing-library/user-event/dist/utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
    editDriver: (newDriver: Driver) => void;
};

export default function EditDriver(props: Props) {
    const initialState: Driver = {
        id: "",
        lastname: "",
        firstname: "",
        birthday: "",
        address: {
            street: "",
            city: "",
            postalCode: "",
            country: ""
        }
    };

    const [driver, setDriver] = useState<Driver>(initialState);
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadDriverById(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function loadDriverById(id: string) {
        axios
            .get("/api/driver/" + id)
            .then((response) => {
                setDriver(response.data);
            })
            .catch(() => {
                toast.error("Couldn't find driver", toastConfig);
                wait(500).then(() => navigate("/drivers/"));
            });
    }

    function onSaveDriver(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (id) {
            props.editDriver(driver);
            toast.success(
                driver.lastname + " " + driver.firstname + " was successfully updated",
                toastConfig
            );
            wait(500).then(() => navigate(`/drivers/${driver.id}`));
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

    function onAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setDriver((prevDriver) => ({
                ...prevDriver,
                id: id,
                address: {
                    ...prevDriver.address,
                    [targetName]: value,
                },
            }));
        }
    }

    function onBirthdayChange(date: Date | null) {
        if (id) {
            setDriver((prevDriver) => ({
                ...prevDriver,
                id: id,
                birthday: date ? date.toISOString() : "",
            }));
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
              <Link to={`/drivers/${driver.id}`}>
                {driver.lastname} {driver.firstname}
              </Link>
              <ArrowForwardIosIcon/>
            </span>
                        Edit
                    </h1>
                    <form onSubmit={onSaveDriver}>
                        <input
                            type="text"
                            name="lastname"
                            value={driver.lastname}
                            placeholder={driver.lastname}
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            name="firstname"
                            value={driver.firstname}
                            placeholder={driver.firstname}
                            onChange={onChange}
                        />
                        <DatePicker
                            placeholderText="Date of birth"
                            dateFormat="dd/MM/yyyy"
                            selected={driver.birthday ? new Date(driver.birthday) : null}
                            onChange={onBirthdayChange}
                        />
                        <input
                            type="text"
                            name="street"
                            value={driver?.address?.street}
                            placeholder="Street"
                            onChange={onAddressChange}
                        />
                        <input
                            type="text"
                            name="city"
                            value={driver?.address?.city}
                            placeholder="City"
                            onChange={onAddressChange}
                        />
                        <input
                            type="text"
                            name="postalCode"
                            value={driver?.address?.postalCode}
                            placeholder="Postal Code"
                            onChange={onAddressChange}
                        />
                        <input
                            type="text"
                            name="country"
                            value={driver?.address?.country}
                            placeholder="Country"
                            onChange={onAddressChange}
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
