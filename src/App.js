import logo from './logo.svg';
import './App.css';
import Carlist from './Carlist';
import { Typography, Toolbar, AppBar } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            Car Shop
          </Typography>
        </Toolbar>
      </AppBar>
      <Carlist /> 
    </div>
  );
}

export default App;
