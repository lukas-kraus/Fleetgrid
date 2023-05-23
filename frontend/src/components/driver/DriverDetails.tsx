import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, {useEffect} from "react";
import useDrivers from "../../hooks/useDrivers";
import {wait} from "@testing-library/user-event/dist/utils";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

type Props = {
    deleteDriver: (id: string) => void;
};

export default function DriverDetails(props: Props) {
    const {driver, loadDriverById} = useDrivers();

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            loadDriverById(id);
        }
        // eslint-disable-next-line
    }, [id]);

    function onDeleteClick() {
        if (driver) {
            props.deleteDriver(driver.id);
            wait(500).then(() => navigate('/drivers'));
            toast.success(driver.lastname + ' ' + driver.firstname + ' was successfully deleted', toastConfig);
        }
    }

    return (
        <div>
            {driver ? (
                <>
                    <h1>
            <span>
              <Link to="/drivers">Drivers</Link>
              <ArrowForwardIosIcon/>
            </span>
                        {driver.lastname} {driver.firstname}
                    </h1>
                    <div className="detail">
                        <h4>{moment(driver.birthday).format('DD.MM.YYYY')}</h4>
                        <p>Date of birth</p>
                    </div>
                    <div className="detail">
                        <h4>{driver.address.street}</h4>
                        <p>Street</p>
                    </div>
                    <div className="detail">
                        <h4>{driver.address.postalCode} {driver.address.city}</h4>
                        <p>City</p>
                    </div>
                    <div className="detail">
                        <h4>{driver.address.country}</h4>
                        <p>Country</p>
                    </div>
                    <div className="clear"/>
                    <div className="flex">
                        <Link to={`/drivers/${driver.id}/edit`} className="button-link">
                            <EditIcon/>
                        </Link>
                        <Link to="#" onClick={onDeleteClick} className="button-link">
                            <DeleteIcon/>
                        </Link>
                    </div>
                </>
            ) : (
                <h1>Loading driver ...</h1>
            )}
        </div>
    );
}