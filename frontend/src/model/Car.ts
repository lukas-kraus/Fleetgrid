import {Driver} from "./Driver";

export type Car = {
    id: string,
    model: string,
    license_plate: string,
    color: string,
    status: string,
    driver: Driver
}

export type NewCar = {
    model: string,
    license_plate: string,
    color: string,
    status: string
}