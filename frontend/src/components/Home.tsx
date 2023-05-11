import {Car} from "../model/Car";
import './Home.css';
import StreetviewIcon from '@mui/icons-material/Streetview';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import EvStationIcon from '@mui/icons-material/EvStation';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

type Props = {
    user: string | undefined
    cars: Car[]
}

export default function Home(props: Props) {

    function countCars(status: string): number {
        return status ? props.cars.filter((car) => car.status.toLowerCase() === status.toLowerCase()).length : props.cars.length;
    }

    return (
        <>
            <h1>Hi {props.user}!</h1>
            <div className="stats">
                <div className="stat">
                    <div className="icon">
                        <StreetviewIcon/>
                    </div>
                    <div className="text">
                        <h2>On the way</h2>
                        <span className="number">{countCars("OTW")}</span>
                    </div>
                </div>
                <div className="stat">
                    <div className="icon">
                        <LocalParkingIcon/>
                    </div>
                    <div className="text">
                        <h2>Parked</h2>
                        <span className="number">{countCars("Parked")}</span>
                    </div>
                </div>
                <div className="stat">
                    <div className="icon">
                        <EvStationIcon/>
                    </div>
                    <div className="text">
                        <h2>Charging</h2>
                        <span className="number">{countCars("Charging")}</span>
                    </div>
                </div>
                <div className="stat">
                    <div className="icon">
                        <TimeToLeaveIcon/>
                    </div>
                    <div className="text">
                        <h2>In Total</h2>
                        <span className="number">{countCars("")}</span>
                    </div>
                </div>
            </div>
        </>
    )
}