import {Car} from "../../model/Car";
import {Link, NavLink} from "react-router-dom";
import CarCard from "./CarCard";
import './CarGallery.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, {useState} from "react";
import StreetviewIcon from "@mui/icons-material/Streetview";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import EvStationIcon from "@mui/icons-material/EvStation";

type Props = {
    cars: Car[]
}

export default function CarGallery(props: Props) {
    const [filterStatus, setFilterStatus] = useState('all');

    const handleFilterClick = (status: string) => {
        setFilterStatus(status);
    };
    return (
        <>
            <h1>Cars</h1>
            <div className="right">
                <NavLink to="/cars/add"><AddCircleIcon/></NavLink>
            </div>
            <div className="filter">
                <Link to="#" className="chip no_icon" onClick={() => handleFilterClick('all')}>
                    <span className="label">All</span>
                </Link>
                <Link to="#" className="chip" onClick={() => handleFilterClick('OTW')}>
                    <span className="icon"><StreetviewIcon/></span>
                    <span className="label">On the way</span>
                </Link>
                <Link to="#" className="chip" onClick={() => handleFilterClick('CHARGING')}>
                    <span className="icon"><EvStationIcon/></span>
                    <span className="label">Charging</span>
                </Link>
                <Link to="#" className="chip" onClick={() => handleFilterClick('PARKED')}>
                    <span className="icon"><LocalParkingIcon/></span>
                    <span className="label">Parked</span>
                </Link>
            </div>
            <table>
                <thead>
                <tr>
                    <th>License plate</th>
                    <th>Model</th>
                    <th>Color</th>
                    <th>Status</th>
                </tr>
                </thead>
                {
                    props.cars
                        .filter(car => filterStatus === 'all' || car.status === filterStatus)
                        .map(car => <CarCard key={car.id} car={car}/>)
                }
            </table>
        </>
    )
}