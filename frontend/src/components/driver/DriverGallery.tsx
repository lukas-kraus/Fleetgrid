import {Link} from "react-router-dom";
import {Driver} from "../../model/Driver";
import DriverCard from "./DriverCard";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

type Props = {
    drivers: Driver[]
}

export default function DriverGallery(props: Props) {
    return (
        <>
            <div className="headline">
                <h1>Drivers</h1>
                <Link to="/drivers/add" className="button-link">
                    <AddIcon/>
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Last name</th>
                    <th>First name</th>
                </tr>
                </thead>
                {
                    props.drivers.map((driver) => <DriverCard key={driver.id} driver={driver}/>)
                }
            </table>
        </>
    )
}