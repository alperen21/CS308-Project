import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo from '../../assests/coffee.png';
import useStyles from './styles';
import { useHistory } from "react-router-dom"; 

const Navbar = () => {
    const history = useHistory();
    const classes = useStyles();

    const toFilter = async() => {
        history.push("/filter_coffees");
    }
    const toTurkish = async() => {
        history.push("/turkish_coffees");
    }
    const toEspresso = async() => {
        history.push("/espressos");
    }
    const toHChoco = async() => {
        history.push("/hot_chocolates");
    }
    const toFilterM = async() => {
        history.push("/filter_coffee_machines");
    }
    const toTurkishM = async() => {
        history.push("/turkish_coffee_machines");
    }
    const toEspressoM = async() => {
        history.push("/espresso_machines");
    }
    const toCart = async() => {
        history.push("/cart");
    };
    const toHome = async() => {
        history.push("/home");
    };

    return (
        <div>
             <>
                <AppBar position="fixed" className={classes.appBar} color="inherit">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} color="inherit">
                            <img src={logo} alt="commerce.js" height="25px" className={classes.image} onClick={() => toHome()}/> Coffee Shop
                        </Typography>
                        <div className={classes.grow} />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label"></InputLabel>
                            <Select placeholder="Categories" labelId="demo-simple-select-label" id="demo-simple-select" >
                            <MenuItem onClick={() => toFilter()} >Filter coffee</MenuItem>
                            <MenuItem onClick={() => toTurkish()}>Turkish coffee</MenuItem>
                            <MenuItem onClick={() => toEspresso()}>Espresso</MenuItem>
                            <MenuItem onClick={() => toHChoco()}>Hot chocolate</MenuItem>
                            <MenuItem onClick={() => toEspressoM()}>Coffee machines</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.button}>
                            <IconButton aria-label="Show cart items" color="inherit">
                                <Badge onClick={() => toCart()}color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
    </>
        </div>
    )
}

export default Navbar
