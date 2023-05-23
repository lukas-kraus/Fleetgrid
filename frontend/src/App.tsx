import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CarGallery from "./components/car/CarGallery";
import AddCar from "./components/car/AddCar";
import CarDetails from "./components/car/CarDetails";
import EditCar from "./components/car/EditCar";
import Header from "./components/Header";
import Login from "./components/Login";
import useUser from "./hooks/useUser";
import Home from "./components/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import DriverGallery from "./components/driver/DriverGallery";
import useDrivers from "./hooks/useDrivers";
import useCars from "./hooks/useCars";
import AddDriver from "./components/driver/AddDriver";
import DriverDetails from "./components/driver/DriverDetails";
import EditDriver from "./components/driver/EditDriver";

function App() {
    const {user, login, logoutUser, isLoggedIn, userDetails} = useUser()
    const {loadAllCars, addCar, editCar, deleteCar, cars} = useCars()
    const {drivers, loadAllDrivers, addDriver, deleteDriver, editDriver} = useDrivers()
    const authenticated = user !== undefined && user !== 'anonymousUser'

    useEffect(() => {
        if (authenticated) {
            loadAllCars();
            loadAllDrivers();
        }
        // eslint-disable-next-line
    }, [authenticated])

    return (
        <>
            <BrowserRouter>
                {authenticated ? (
                    <Header onLogout={logoutUser}
                            userDetails={userDetails}
                    />
                ) : null}
                <Routes>
                    <Route path='/login' element={<Login onLogin={login}/>}/>
                    <Route element={<ProtectedRoutes user={user} isLoggedIn={isLoggedIn}/>}>
                        <Route path="/" element={<Home user={user} cars={cars} userDetails={userDetails}/>}/>
                        <Route path="/cars" element={<CarGallery cars={cars}/>}/>
                        <Route path="/cars/add" element={<AddCar addCar={addCar}/>}/>
                        <Route path="/cars/:id" element={<CarDetails deleteCar={deleteCar}/>}/>
                        <Route path="/cars/:id/edit" element={<EditCar editCar={editCar}/>}/>
                        <Route path="/drivers" element={<DriverGallery drivers={drivers}/>}/>
                        <Route path="/drivers/add" element={<AddDriver addDriver={addDriver}/>}/>
                        <Route path="/drivers/:id" element={<DriverDetails deleteDriver={deleteDriver}/>}/>
                        <Route path="/drivers/:id/edit" element={<EditDriver editDriver={editDriver}/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
        ;
}

export default App;
