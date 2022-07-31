import React , {useState} from 'react';
import useStyles from './styles';
import {Avatar,Button,Paper,Typography, Container,Grid, TextField} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import  {GoogleLogin} from 'react-google-login';
import Icon from './icon';
import { useDispatch } from 'react-redux';

const Auth = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [isSignup, setIsSignup] = useState(false);
     const classes = useStyles();
     const dispatch = useDispatch();

     const handleSubmit = () => {

     }
     const handleChange = () => {

     }
     const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type: 'AUTH', data : {result, token}})
        } catch (error) {
            console.log(error);
        }
     }
     const googleFailure = (error) => {
        console.log(error)
        console.log('Google Sıgn In was unsuccessful. Please try again later')
     }
     const switchMode = () => {
        setIsSignup((isSignup) => !isSignup)
     }
     const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
     }

    return (
        <Container  component='main' maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar} >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup &&  (
                        <>     
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                            <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus half /> 
                        </>
                         )
                        }
                        <Input name='email' label='Email Adress' handleChange={handleChange} type='email' /> 
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password" } handleShowPassword={handleShowPassword}/>
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>} 
                    </Grid>
                    <Button  type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >{isSignup ? 'Sign Up' : 'Sign In'} </Button>
                    <GoogleLogin 
                        clientId='387881228961-hmsnjblmb2aclm4bmb95kpupsqtlk99a.apps.googleusercontent.com'
                        render={(renderProps) => (<Button  className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                            Google Sign In
                        </Button>)}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : 'Dont have an account ? Sign Up' }
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth;