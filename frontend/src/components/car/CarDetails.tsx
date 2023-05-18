import React, {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";
import './CarDetails.css';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";
import useCars from "../../hooks/useCars";
import useDrivers from "../../hooks/useDrivers";

type Props = {
    deleteCar: (id: string) => void;
};

export default function CarDetails(props: Props) {
    const {car, loadCarById} = useCars();
    const {loadDriverById, driver} = useDrivers();
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadCarById(id);
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (car?.driver) {
            loadDriverById(car?.driver)
        } // eslint-disable-next-line
    }, [car]);

    function onDeleteClick() {
        if (car) {
            props.deleteCar(car.id);
            wait(500).then(() => navigate('/cars'));
            toast.success(car.license_plate + ' was successfully deleted', toastConfig);
        }
    }

    return (
        <div>
            {car ? (
                <>
                    <h1>
            <span>
              <Link to="/cars">Cars</Link>
              <ArrowForwardIosIcon/>
            </span>
                        {car.license_plate}
                    </h1>
                    <ul>
                        <li>
                            <b>License plate:</b> {car.license_plate}
                        </li>
                        <li>
                            <b>Color:</b> {car.color}
                        </li>
                        <li>
                            <b>ID:</b> {car.id}
                        </li>
                        <li>
                            <b>Status:</b> {car.status}
                        </li>
                        {car.driver ? (
                            <li>
                                <b>Driver:</b> {driver ? driver.firstname + " " + driver.lastname : 'Loading driver ...'}
                            </li>
                        ) : null}
                    </ul>
                    <Link to={`/cars/${car.id}/edit`} className="button-link">
                        Edit
                    </Link>
                    <Link to="#" onClick={onDeleteClick} className="button-link">
                        Delete
                    </Link>
                </>
            ) : (
                <h1>Loading car ...</h1>
            )}
        </div>
    );
}
