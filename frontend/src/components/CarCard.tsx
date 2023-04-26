import {Car} from "../model/Car";

type Props = {
    car: Car
}

export default function CarCard(props: Props) {
    return (
        <ul>
            <li><b>License plate:</b> {props.car.license_plate}</li>
            <li><b>Model:</b> {props.car.model}</li>
            <li><b>Status:</b> {props.car.status}</li>
            <li><b>Color:</b> {props.car.color}</li>
        </ul>
    )
}