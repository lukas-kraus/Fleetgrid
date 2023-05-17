import {Link} from "react-router-dom";
import {Driver} from "../../model/Driver";

type Props = {
    driver: Driver
}

export default function DriverCard(props: Props) {
    return (
        <tbody>
        <tr>
            <td><Link to={props.driver.id}>{props.driver.firstname}</Link></td>
            <td>{props.driver.lastname}</td>
        </tr>
        </tbody>
    )
}