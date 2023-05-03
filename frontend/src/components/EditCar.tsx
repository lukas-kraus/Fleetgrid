import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import "./AddCar.css"
import {Car} from "../model/Car";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";

type Props = {
    editCar: (newCar: Car) => void
}

export default function EditCar(props: Props) {

    const initialState: Car = {
        id: "",
        model: "",
        license_plate: "",
        color: "",
        status: ""
    }

    const [car, setCar] = useState<Car>(initialState)
    const {id} = useParams<{ id: string }>()

    useEffect(() => {
            if (id) {
                loadCarById(id)
            }
        }, // eslint-disable-next-line
        []
    )

    function loadCarById(id: string) {
        axios.get('/api/cars/' + id)
            .then((response) => {
                setCar(response.data)
            })
            .catch((r) => {
                console.error("Car not found" + r)
            })
    }

    const navigate = useNavigate();

    function onSaveCar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (id) {
            props.editCar(car);
            wait(500).then(() => navigate(`/cars/${car.id}`))
        }
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const targetName: string = event.target.name;
        const value: string = event.target.value;
        if (id) {
            setCar(
                {...car, id: id, [targetName]: value}
            )
        }
    }

    return (
        <div>
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
                <input type="text"
                       name="status"
                       value={car.status}
                       placeholder={car.status}
                       onChange={onChange}
                />
                <button>Update</button>
            </form>
        </div>
    )
}