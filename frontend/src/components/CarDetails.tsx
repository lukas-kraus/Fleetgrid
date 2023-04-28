import {Car} from "../model/Car";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function CarDetails() {

    const [car, setCar] = useState<Car>()
    const {id} = useParams<{ id: string }>()


    useEffect(() => {
        if (id) {
            loadCarById(id)
        }
        //eslint-disable-next-line
    }, [])

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
                    </>
                    :
                    <h1>Loading ....</h1>
            }
        </div>
    )
}