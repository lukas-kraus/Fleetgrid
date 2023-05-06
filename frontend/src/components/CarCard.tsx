import {Car} from "../model/Car";
import {Link} from "react-router-dom";

type Props = {
    car: Car
}

export default function CarCard(props: Props) {
    return (
        <tbody>
        <tr>
            <td><Link to={props.car.id}>{props.car.license_plate}</Link></td>
            <td>{props.car.model}</td>
            <td>{props.car.color}</td>
            <td>{props.car.status}</td>
        </tr>
        </tbody>
    )
}