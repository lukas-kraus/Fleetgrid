import {Link} from "react-router-dom";
import {Driver} from "../../model/Driver";

type Props = {
    driver: Driver
}

export default function DriverCard(props: Props) {
    return (
        <tbody>
        <tr>
            <td><Link to={props.driver.id}>{props.driver.lastname}</Link></td>
            <td>{props.driver.firstname}</td>
        </tr>
        </tbody>
    )
}