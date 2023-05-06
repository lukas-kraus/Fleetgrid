import {Car} from "../model/Car";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {wait} from "@testing-library/user-event/dist/utils";
import './CarDetails.css';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
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
        // eslint-disable-next-line
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

    function onDeleteClick() {
        if (car) {
            props.deleteCar(car.id);
            wait(500).then(() => navigate("/cars"))
        }
    }

    return (
        <div>
            {car ? (
                <>
                    <h1>
                        <span>
                            <Link to="/cars">Cars</Link>
                            <ArrowForwardIosIcon/>
                        </span>
                        {car.license_plate}
                    </h1>
                    <ul>
                        <li><b>License plate:</b> {car.license_plate}</li>
                        <li><b>Color:</b> {car.color}</li>
                        <li><b>ID:</b> {car.id}</li>
                    </ul>
                    <Link to={`/cars/${car.id}/edit`} className="button-link">Edit</Link>
                    <Link to="#" onClick={onDeleteClick} className="button-link">Delete</Link>
                </>
            ) : (
                <h1>Loading ...</h1>
            )}
        </div>
    )
}