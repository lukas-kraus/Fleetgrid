import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Car} from "../../model/Car";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {toastConfig} from "../../hooks/toastConfig";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useDrivers from "../../hooks/useDrivers";

type Props = {
    editCar: (newCar: Car) => void
}

export default function EditCar(props: Props) {

    const initialState: Car = {
        id: "",
        model: "",
        license_plate: "",
        color: "",
        status: "",
        driver: ""
    }

    const [car, setCar] = useState<Car>(initialState)
    const {loadDriverById, loadAllDrivers, drivers} = useDrivers();
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
            if (id) {
                loadCarById(id)
                loadAllDrivers()
            }
        }, // eslint-disable-next-line
        []
    )
    useEffect(() => {
        if (car?.driver) {
            loadDriverById(car?.driver)
        } // eslint-disable-next-line
    }, [car]);

    function loadCarById(id: string) {
        axios.get('/api/cars/' + id)
            .then((response) => {
                setCar(response.data)
            })
            .catch((r) => {
                toast.error("Couldn't find car: " + r, toastConfig)
            })
    }

    const navigate = useNavigate();

    function onSaveCar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (id) {
            props.editCar(car);
            toast.success(car.license_plate + " was successfully updated!", toastConfig)
            wait(500).then(() => navigate(`/cars/${car.id}`))
        }
    }

    function onChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setCar({
                ...car,
                id: id,
                [targetName]: value,
            });
        }
    }

    return (
        <div>
            <h1>
                        <span>
                            <Link to="/cars">Cars</Link>
                            <ArrowForwardIosIcon/>
                            <Link to={`/cars/${car.id}`}>{car.license_plate}</Link>
                            <ArrowForwardIosIcon/>
                        </span>
                Edit
            </h1>
            <form onSubmit={onSaveCar}>
                <input type="text"
                       name="license_plate"
                       value={car.license_plate}
                       placeholder={car.license_plate}
                       onChange={onChange}
                />
                <input type="text"
                       name="model"
                       value={car.model}
                       placeholder={car.model}
                       onChange={onChange}
                />
                <input type="text"
                       name="color"
                       value={car.color}
                       placeholder={car.color}
                       onChange={onChange}
                />
                <select name="status" value={car.status} onChange={onChange}>
                    <option value="PARKED">Parked</option>
                    <option value="OTW">On the way</option>
                    <option value="CHARGING">Charging</option>
                </select>
                {car.status === 'OTW' && (
                    <select name="driver" value={car.driver} onChange={onChange}>
                        <option value="">No Driver</option>
                        {drivers
                            .sort((a, b) => a.lastname.localeCompare(b.lastname))
                            .map((driver) => (
                                <option key={driver.id} value={driver.id}>
                                    {driver.lastname} {driver.firstname}
                                </option>
                            ))}
                    </select>
                )}
                <button className="button">Update</button>
            </form>
        </div>
    )
}