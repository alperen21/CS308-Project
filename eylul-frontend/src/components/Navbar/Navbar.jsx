import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo from '../../assests/coffee.png';
import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
             <>
                <AppBar position="fixed" className={classes.appBar} color="inherit">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} color="inherit">
                            <img src={logo} alt="commerce.js" height="25px" className={classes.image} /> Coffee Shop
                        </Typography>
                        <div className={classes.grow} />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Filter coffee</MenuItem>
                            <MenuItem value={20}>Turkish coffee</MenuItem>
                            <MenuItem value={30}>Espresso</MenuItem>
                            <MenuItem value={30}>Hot chocolate</MenuItem>
                            <MenuItem value={30}>Filter coffee Machine</MenuItem>
                            <MenuItem value={30}>Turkish coffee machine</MenuItem>
                            <MenuItem value={30}>Espresso machine</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.button}>
                            <IconButton aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={2} color="secondary">
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
