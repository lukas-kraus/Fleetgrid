import axios from "axios";
import {useState} from "react";
import {Driver} from "../model/Driver";

export default function useDrivers() {

    const [drivers, setDrivers] = useState<Driver[]>([]);

    function loadAllDrivers() {
        axios.get("/api/driver")
            .then(response => {
                setDrivers(response.data);
            })
            .catch(() => console.error("Couldn't load all drivers"));
    }

    return {drivers, loadAllDrivers}
}