import {Car} from "../model/Car";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

type Props = {
    editCar: (car: Car) => void;
    deleteCar: (id: string) => void;
};

export default function CarDetails(props: Props) {

    const [car, setCar] = useState<Car>()
    const {id} = useParams<{ id: string }>()
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadCarById(id)
        }
        //eslint-disable-next-line
    }, [])

    function onDeleteClick() {
        if (car) {
            props.deleteCar(car.id);
            navigate("/cars");
        }
    }

    function loadCarById(id: string) {
        axios.get('/api/cars/' + id)
            .then((response) => {
                setCar(response.data)
            })
            .catch((r) => {
                console.error("Car not found" + r)
            })
    }

    return (
        <div>
            {
                car
                    ? <>
                        <h1>{car.model} ({car.status})</h1>
                        <ul>
                            <li><b>License plate:</b> {car.license_plate}</li>
                            <li><b>Color:</b> {car.color}</li>
                            <li><b>ID:</b> {car.id}</li>
                        </ul>
                        <button>Edit</button>
                        <button onClick={onDeleteClick}>Delete</button>
                    </>
                    :
                    <h1>Loading ....</h1>
            }
        </div>
    )
}