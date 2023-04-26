import {Car} from "../model/Car";
import CarCard from "./CarCard";

type Props = {
    cars: Car[]
}

export default function CarGallery(props: Props) {
    return (
        <>
            <h1>All Cars</h1>
            <div>
                {
                    props.cars.map((car) => <CarCard key={car.id} car={car}/>)
                }
            </div>
        </>
    )
}