import React, {useEffect, useState} from 'react';

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts'

import {Container, Grid,Grow} from '@material-ui/core';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId,dispatch])

    return (
        <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container  justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={8} marginTop={4}>
                            <Posts setCurrentId={setCurrentId}  />
                        </Grid>
                        <Grid item xs={12} sm={4} marginTop={2}>
                            <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;