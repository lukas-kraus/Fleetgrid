import {Car} from "../../model/Car";
import {Link, useSearchParams} from "react-router-dom";
import CarCard from "./CarCard";
import "./CarGallery.css";
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect, useState} from "react";
import StreetviewIcon from "@mui/icons-material/Streetview";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import EvStationIcon from "@mui/icons-material/EvStation";

type Props = {
    cars: Car[];
};
export default function CarGallery(props: Props) {
    const [searchParams] = useSearchParams();
    const currentStatus = searchParams.get("status") || "all";
    const [filterStatus, setFilterStatus] = useState(currentStatus);
    useEffect(() => {
        setFilterStatus(currentStatus);
        // eslint-disable-next-line
    }, [currentStatus]);
    return (<>
        <div className="headline">
            <h1>Cars</h1>
            <Link to="/cars/add" className="button-link">
                <AddIcon/>
            </Link>
        </div>
        <div className="filter">
            <Link to=""
                  className={
                      `no_icon chip ${
                          filterStatus === "all"
                              ? "active"
                              : ""
                      }`
                  }
                  key="">
                <span className="label">All</span>
            </Link>
            <Link to="?status=otw"
                  className={
                      `chip ${
                          filterStatus === "otw"
                              ? "active-otw"
                              : ""
                      }`
                  }
                  key="otw">
                <span className="icon">
                    <StreetviewIcon/>
                </span>
                <span className="label">On the way</span>
            </Link>
            <Link to="?status=charging"
                  className={
                      `chip ${
                          filterStatus === "charging"
                              ? "active-charging"
                              : ""
                      }`
                  }
                  key="charging">
                <span className="icon">
                    <EvStationIcon/>
                </span>
                <span className="label">Charging</span>
            </Link>
            <Link to="?status=parked"
                  className={
                      `chip ${
                          filterStatus === "parked"
                              ? "active-parked"
                              : ""
                      }`
                  }
                  key="parked">
                <span className="icon">
                    <LocalParkingIcon/>
                </span>
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
                props
                    .cars
                    .filter((car) => filterStatus === "all" || car.status.toLowerCase() === filterStatus.toLowerCase())
                    .map((car) => (<CarCard key={
                        car.id
                    }
                                            car={car}/>))
            }
        </table>
    </>);
}