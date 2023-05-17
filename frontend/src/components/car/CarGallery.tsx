import {Car} from "../../model/Car";
import {NavLink} from "react-router-dom";
import CarCard from "./CarCard";
import './CarGallery.css';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    cars: Car[]
}

export default function CarGallery(props: Props) {
    return (
        <>
            <h1>Cars</h1>
            <div className="right">
                <NavLink to="/cars/add"><AddCircleIcon/></NavLink>
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
                    props.cars.map((car) => <CarCard key={car.id} car={car}/>)
                }
            </table>
        </>
    )
}