import {useState} from 'react';
import {Button, Dialog, DialogTitle} from '@mui/material';
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

function EditCar(props) {
    //komponenttiin tila, jolla saadaan kontrolloitua
    //dialogi toimii ikkunana ja aukea modaalisesti
    const [open, setOpen] = useState(false);

    //auto tyhjillä tiedoilla
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        year: "",
        price: ""
    });

    const fetchCar = (link) => {
        //fetch auton tiedot
        fetch(link)
            .then(response => response.json())
            .then(data => setCar(data))
        console.log(car);
    }

    const handleClickOpen = () => {
        console.log("handleClickOpen");
        fetchCar(props.link);
        console.log(car);
        setOpen(true);
    }

    const handleClose = () => {
        console.log("handleClose");
        setOpen(false);
    }

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
        console.log("inputchange: " + JSON.stringify(event.target.value));
      };

    //tallenna muokattu auto
    const editCar = () => {
        props.saveCar(car, props.link);
        handleClose();
    };

    return (
        <div>
                <IconButton color="primary" onClick={handleClickOpen}>
                    <CreateIcon />
                </IconButton>
                <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        label="Brand"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="model"
                        value={car.model}
                        label="Model"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="color"
                        value={car.color}
                        label="Color"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        label="Fuel type"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="year"
                        value={car.year}
                        label="Year"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        value={car.price}
                        label="Price"
                        fullWidth
                        onChange={e => handleInputChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={editCar}>Save car</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditCar;