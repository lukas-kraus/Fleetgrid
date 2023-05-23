import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, {useEffect} from "react";
import useDrivers from "../../hooks/useDrivers";
import {wait} from "@testing-library/user-event/dist/utils";
import {toast} from "react-toastify";
import {toastConfig} from "../../hooks/toastConfig";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    }, []);

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
                    <ul>
                        <li>
                            <b>Last name:</b> {driver.lastname}
                        </li>
                        <li>
                            <b>First name:</b> {driver.firstname}
                        </li>
                    </ul>
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