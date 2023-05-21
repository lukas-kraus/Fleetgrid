import {Car} from "../../model/Car";
import {Link} from "react-router-dom";

type Props = {
    car: Car
}

export default function CarCard(props: Props) {

    const statusAbbreviation: Record<string, string> = {
        'OTW': 'On the way',
        'PARKED': 'Parked',
        'CHARGING': 'Charging'
    };
    const status: string = statusAbbreviation[props.car.status] || props.car.status;

    return (
        <tbody>
        <tr>
            <td><Link to={props.car.id}>{props.car.license_plate}</Link></td>
            <td>{props.car.model}</td>
            <td>{props.car.color}</td>
            <td className="status"><span className={props.car.status.toLowerCase()}>{status}</span></td>
        </tr>
        </tbody>
    )
}