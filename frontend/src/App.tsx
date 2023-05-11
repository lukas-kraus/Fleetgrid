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
import ProtectedRoutes from "./ProtectedRoutes";
import {ToastContainer} from "react-toastify";

function App() {
    const {user, login, logout, isLoggedIn} = useUser()
    const [cars, setCars] = useState<Car[]>([])
    const authenticated = user !== undefined && user !== 'anonymousUser'

    useEffect(() => {
        if (authenticated) {
            loadAllCars();
        }
        // eslint-disable-next-line
    }, [authenticated])

    function logoutUser() {
        return new Promise<void>((resolve) => {
            logout();
            resolve();
        });
    }

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
                {authenticated ? (
                    <Header onLogout={logoutUser}
                            user={user}
                    />
                ) : null}
                <Routes>
                    <Route path='/login' element={<Login onLogin={login}/>}/>
                    <Route element={<ProtectedRoutes user={user} isLoggedIn={isLoggedIn}/>}>
                        <Route path="/" element={<Home user={user} cars={cars}/>}/>
                        <Route path="/cars" element={<CarGallery cars={cars}/>}/>
                        <Route path="/cars/add" element={<AddCar addCar={addCar}/>}/>
                        <Route path="/cars/:id" element={<CarDetails deleteCar={deleteCar}/>}/>
                        <Route path="/cars/:id/edit" element={<EditCar editCar={editCar}/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer/>
        </>
    )
        ;
}

export default App;
