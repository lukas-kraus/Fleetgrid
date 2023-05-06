import {Car} from "../model/Car";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {NavLink} from "react-router-dom";
import './CarGallery.css';

type Props = {
    cars: Car[]
}

export default function CarGallery(props: Props) {

    const rows = props.cars.map((car) => ({
        id: car.id,
        license_plate: car.license_plate,
        model: car.model,
        color: car.color,
        status: car.status,
    }));

    const columns: GridColDef[] = [
        {field: 'license_plate', headerName: 'License plate', flex: 1},
        {field: 'model', headerName: 'Model', flex: 1},
        {field: 'color', headerName: 'Color', flex: 1},
        {field: 'status', headerName: 'Status', flex: 1},
    ];

    return (
        <>
            <h1>All Cars</h1>
            <NavLink to="/cars/add">Add car</NavLink>
            <div style={{height: 300, width: '100%'}}>
                <DataGrid rows={rows} columns={columns}/>
            </div>
        </>
    )
}