import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Car, NewCar} from "./model/Car";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CarGallery from "./components/CarGallery";
import AddCar from "./components/AddCar";
import CarDetails from "./components/CarDetails";
import Header from "./components/Header";

function App() {

    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        loadAllCars()
    }, [])

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

    function deleteCar(id: string) {
        axios.delete("/api/cars/" + id)
            .then(() => {
                setCars(cars.filter((car) => car.id !== id))
            })
            .catch(() => console.error("Couldn't delete car"));
    }

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/cars" element={<CarGallery cars={cars}/>}/>
                    <Route path="/cars/add" element={<AddCar addCar={addCar}/>}/>
                    <Route path="/cars/:id" element={<CarDetails deleteCar={deleteCar}/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
