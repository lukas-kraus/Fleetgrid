import axios from "axios";
import {useState} from "react";
import {Driver, NewDriver} from "../model/Driver";
import {toast} from "react-toastify";
import {toastConfig} from "./toastConfig";

export default function useDrivers() {

    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [driver, setDriver] = useState<Driver>();

    function loadAllDrivers() {
        axios.get("/api/driver")
            .then(response => {
                setDrivers(response.data);
            })
            .catch(() => console.error("Couldn't load all drivers"));
    }

    function addDriver(newDriver: NewDriver) {
        axios.post("/api/driver", newDriver)
            .then(() => loadAllDrivers())
            .catch(() => console.error("Couldn't add new driver"));
    }

    function deleteDriver(id: string) {
        axios.delete("/api/driver/" + id)
            .then(() => {
                setDrivers(drivers.filter((driver) => driver.id !== id))
            })
            .catch(() => console.error("Couldn't delete driver"));
    }

    function loadDriverById(id: string) {
        axios
            .get('/api/driver/' + id)
            .then((response) => {
                setDriver(response.data);
            })
            .catch(() => {
                toast.error("Couldn't find driver", toastConfig);
            });
    }

    return {drivers, loadAllDrivers, loadDriverById, driver, addDriver, deleteDriver}
}