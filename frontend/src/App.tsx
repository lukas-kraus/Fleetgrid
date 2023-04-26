import React, {useEffect, useState} from 'react';
import './App.css';
import axios from "axios";
import {Car} from "./model/Car";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CarGallery from "./components/CarGallery";

function App() {

    const [cars, setCars] = useState<Car[]>([])

    useEffect(() => {
        axios.get("/api/cars")
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cars" element={<CarGallery cars={cars}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
