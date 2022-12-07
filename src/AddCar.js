import {useState} from 'react';
import {Button, Dialog, DialogTitle} from '@mui/material';
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

function AddCar(props) {
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

    const handleClickOpen = () => {
        console.log("handleClickOpen");
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

    //tallenna auto ja tyhjennä const car
    const addCar = () => {
        props.saveCar(car);
        setCar({
            brand: "",
            model: "",
            color: "",
            fuel: "",
            year: "",
            price: ""
        })
        handleClose(); //sulje dialog
      };

    return (
        <div>
            <Button variant='outlined' onClick={handleClickOpen}>Add car</Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>New car</DialogTitle>
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
                    <Button onClick={addCar}>Save car</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddCar;