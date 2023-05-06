import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Car, NewCar} from "./model/Car";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CarGallery from "./components/CarGallery";
import AddCar from "./components/AddCar";
import CarDetails from "./components/CarDetails";
import EditCar from "./components/EditCar";
import Header from "./components/Header";
import Login from "./components/Login";
import useUser from "./hooks/useUser";
import Home from "./components/Home";

function App() {
    const {login} = useUser()
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

    return (
        <>
            <BrowserRouter>
                <Header/>
                <main>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login onLogin={login}/>}/>
                        <Route path="/cars" element={<CarGallery cars={cars}/>}/>
                        <Route path="/cars/add" element={<AddCar addCar={addCar}/>}/>
                        <Route path="/cars/:id" element={<CarDetails deleteCar={deleteCar}/>}/>
                        <Route path="/cars/:id/edit" element={<EditCar editCar={editCar}/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
