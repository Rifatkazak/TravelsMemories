import React from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button} from '@mui/material';
import useStyles from './styles';
import {Link} from 'react-router-dom';


 const Navbar = () => {
    const classes = useStyles();
    const user = null ;
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
                    <Button variant='contained' className={classes.logout} color="secondary"></Button>
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