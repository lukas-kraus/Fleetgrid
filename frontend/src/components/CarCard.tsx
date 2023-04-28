import {Car} from "../model/Car";
import {Link} from "react-router-dom";
import './CarCard.css';

type Props = {
    car: Car
}

export default function CarCard(props: Props) {
    return (
        <div className="car-details">
            <ul>
                <li><b>License plate:</b> {props.car.license_plate}</li>
                <li><b>Model:</b> {props.car.model}</li>
                <li><b>Status:</b> {props.car.status}</li>
                <li><b>Color:</b> {props.car.color}</li>
            </ul>
            <Link to={props.car.id}>Details</Link>
        </div>
    )
}