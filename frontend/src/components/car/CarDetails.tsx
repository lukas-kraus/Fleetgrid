import React, {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {wait} from "@testing-library/user-event/dist/utils";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
        } // eslint-disable-next-line
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

    const statusAbbreviation: Record<string, string> = {
        'OTW': 'On the way',
        'PARKED': 'Parked',
        'CHARGING': 'Charging'
    };

    const status: string = car?.status ? statusAbbreviation[car.status] || car.status : '';


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
                    <div className="detail">
                        <h4>{car.model}</h4>
                        <p>Model</p>
                    </div>
                    <div className="detail">
                        <h4>{car.color}</h4>
                        <p>Color</p>
                    </div>
                    <div className="detail">
                        <h4>{status}</h4>
                        <p>Status</p>
                    </div>
                    {car.driver ? (
                        <div className="detail">
                            <h4>{driver ? driver.firstname + " " + driver.lastname : 'Loading driver ...'}</h4>
                            <p>Driver</p>
                        </div>
                    ) : null}
                    <div className="clear"/>
                    <div className="flex">
                        <Link to={`/cars/${car.id}/edit`} className="button-link">
                            <EditIcon/>
                        </Link>
                        <Link to="#" onClick={onDeleteClick} className="button-link">
                            <DeleteIcon/>
                        </Link>
                    </div>
                </>
            ) : (
                <h1>Loading car ...</h1>
            )}
        </div>
    );
}
