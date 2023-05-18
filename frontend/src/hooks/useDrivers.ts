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

    function loadDriverById(id: string) {
        axios
            .get('/api/driver/' + id)
            .then((response) => {
                setDriver(response.data);
            })
            .catch((r) => {
                toast.error("Couldn't load driver: " + r, toastConfig);
            });
    }

    return {drivers, loadAllDrivers, loadDriverById, driver, addDriver}
}