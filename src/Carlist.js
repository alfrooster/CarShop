import React, { useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from './AddCar'
import EditCar from './EditCar'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Carlist () {
    //luodaan tila, johon saadaan lista autoista
    const [cars, setCars] = useState([]);

    //haetaan rest-rajapinnasta autot
    useEffect(() => {
        console.log("ollaan useeffect-funktiossa");
        fetchCars();
    }, []);

    const fetchCars = () => {
        //fetch jolla haetaan tiedot autoista
        fetch("https://carrestapi.herokuapp.com/cars")
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
    }

    const deleteCar = (link) => {
        console.log("deletoitu " + link);
        fetch(link, {method: 'DELETE'})
            .then(response => {
                if(response.ok) {
                    fetchCars();
                }
            })
    }

    //POST pyyntö tallentaakseen auton
    const saveCar = (car) => {
        fetch("https://carrestapi.herokuapp.com/cars", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(car),
        })
          .then((response) => fetchCars())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(car));
    }

    //PUT pyyntö tallentaakseen muokatun auton
    const saveEditedCar = (car, link) => {
        fetch(link , {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(car),
        })
          .then((response) => fetchCars())
          .catch((err) => console.error(err));
        console.log(JSON.stringify(car));
    }

    const [columnDefs, setColumnDefs] = useState([
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'year', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {
            headerName: '',
            width: 80,
            field: '_links.self.href',
            cellRenderer: params =>
            <EditCar saveCar={saveEditedCar} link={params.value}/>
        },
        {
            headerName: '',
            width: 100,
            field: '_links.self.href',
            cellRenderer: params =>
            <IconButton color="error" onClick={() => deleteCar(params.value)}>
                <DeleteIcon />
            </IconButton>
        }
    ]);

    return(
        <>
            <AddCar saveCar={saveCar}/>
            <div className="ag-theme-alpine" style={{height: '580px', width: '100%', margin: 'auto'}}>
                <AgGridReact rowData={cars} columnDefs={columnDefs}
                    animateRows={true} rowSelection='multiple'
                    paginationPageSize={10} pagination={true} />
            </div>
        </>
    )
}

export default Carlist;