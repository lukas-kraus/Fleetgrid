import {FormEvent, useState} from "react";
import {NewCar} from "../model/Car";
import {useNavigate} from "react-router-dom";
import './AddCar.css';

type AddCarProps = {
    addCar: (newCar: NewCar) => void
}

export default function AddCar(props: AddCarProps) {
    const [model, setModel] = useState<string>('')
    const [license_plate, setLicensePlate] = useState<string>("")
    const [color, setColor] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    const navigate = useNavigate();

    function onSaveCar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newCar: NewCar = {model: model, license_plate: license_plate, color: color, status: status}

        props.addCar(newCar)

        navigate("/cars");
    }

    return (
        <form onSubmit={onSaveCar}>
            <input type="text"
                   value={license_plate}
                   placeholder="License plate"
                   required
                   onChange={(event) => {
                       setLicensePlate(event.target.value)
                   }}/>
            <input type="text"
                   value={model}
                   placeholder="Model"
                   required
                   onChange={(event) => {
                       setModel(event.target.value)
                   }}/>
            <input type="text"
                   value={color}
                   placeholder="Color"
                   required
                   onChange={(event) => {
                       setColor(event.target.value)
                   }}/>
            <input type="text"
                   value={status}
                   placeholder="Status"
                   required
                   onChange={(event) => {
                       setStatus(event.target.value)
                   }}/>
            <button>Add Car</button>
        </form>
    )
}
