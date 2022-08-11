import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button, Grid} from '@mui/material';
import useStyles from './styles';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import travelLogo from '../../assets/travelLogo.png';

 const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        const token = user?.token;

        //For control token expire
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime() ) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

    const logout = () => {
        dispatch({type: 'LOGOUT'});

        history.push('/');

        setUser(null);
    }

    return (
    <AppBar className={classes.AppBar} position='static' color='inherit'>
        <Grid item sm={12} xs={12} className={classes.brandContainer}>
            <Link className={classes.heading} to="/" >
                <Grid className={classes.grow}>
                    <Button className={[classes.mainLogo]}>
                        <Avatar src={travelLogo} className={classes.avatar} />
                    </Button>
                    <Typography className={classes.headingText} color='primary' variant='h4' align='center'>
                        Travel Memories
                    </Typography>
                </Grid>    
            </Link>
            <Toolbar className={classes.toolbar}>
                
                {user ? 
                <div className={classes.profile}>
                    <Avatar className={classes.purple}  alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography className={classes.userName} variant='h6' >{user.result.name}</Typography>
                    <Button color="inherit" className={classes.buttonFontSize}>Contacts</Button>
                    <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div> : (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )
                }
            </Toolbar>
        </Grid>
    </AppBar> 
    )
 }
    


export default Navbar;