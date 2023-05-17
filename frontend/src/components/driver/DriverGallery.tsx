import {NavLink} from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Driver} from "../../model/Driver";
import DriverCard from "./DriverCard";

type Props = {
    drivers: Driver[]
}

export default function DriverGallery(props: Props) {
    return (
        <>
            <h1>Drivers</h1>
            <div className="right">
                <NavLink to="/drivers/add"><AddCircleIcon/></NavLink>
            </div>
            <table>
                <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                </tr>
                </thead>
                {
                    props.drivers.map((driver) => <DriverCard key={driver.id} driver={driver}/>)
                }
            </table>
        </>
    )
}