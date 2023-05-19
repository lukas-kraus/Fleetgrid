import {useState} from "react";
import axios from "axios";
import {Car, NewCar} from "../model/Car";
import {toast} from "react-toastify";
import {toastConfig} from "./toastConfig";

export default function useCars() {

    const [cars, setCars] = useState<Car[]>([])
    const [car, setCar] = useState<Car>();

    function loadAllCars() {
        axios.get("/api/cars")
            .then(response => {
                setCars(response.data);
            })
            .catch(() => console.error("Couldn't load all cars"));
    }

    function addCar(newCar: NewCar) {
        axios.post("/api/cars", newCar)
            .then(() => loadAllCars())
            .catch(() => console.error("Couldn't add new car"));
    }

    function editCar(car: Car) {
        axios.put(`/api/cars/${car.id}`, car)
            .then((putCarResponse) => {
                setCars(cars.map(currentCar => {
                    if (currentCar.id === car.id) {
                        return putCarResponse.data
                    } else {
                        return currentCar
                    }
                }))
            })
            .catch(console.error)
    }

    function deleteCar(id: string) {
        axios.delete("/api/cars/" + id)
            .then(() => {
                setCars(cars.filter((car) => car.id !== id))
            })
            .catch(() => console.error("Couldn't delete car"));
    }

    function loadCarById(id: string) {
        axios
            .get('/api/cars/' + id)
            .then((response) => {
                setCar(response.data)
            })
            .catch((r) => {
                toast.error("Couldn't load car: " + r, toastConfig);
            });
    }

    return {loadAllCars, addCar, editCar, deleteCar, cars, loadCarById, car}
}