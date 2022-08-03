import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button} from '@mui/material';
import useStyles from './styles';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

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
        <div className={classes.brandContainer}>
            <Typography className={classes.heading} variant='h2' align='center'>
                    Travel Memories
            </Typography>
            <Toolbar className={classes.toolbar}>
                {user ? 
                <div className={classes.profile}>
                    <Avatar className={classes.purple}  alt={user.result.name} src={user.result.imageUrl}>
                        {user.result.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography className={classes.userName} variant='h6' >{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div> : (
                    <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
                )
                }
            </Toolbar>
        </div>
    </AppBar> 
    )
 }
    


export default Navbar;