import React, {useEffect, useState} from 'react';

import useStyles from './styles';
import { useDispatch } from 'react-redux';
import {getPosts} from '../../actions/posts'

import {Container, Grid,Grow, Paper, AppBar , TextField, Button} from '@material-ui/core';
import {useHistory, useLocation} from 'react-router-dom'
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts';

function useQuery() {
    return new URLSearchParams(useLocation().search) //take params from url
}

const Home = () => {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();
    const page = query.get('page') || 1 ;
    const searchQuerry = query.get('searchQuerry');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId,dispatch])

    const searchPost = () => {
        if (search.trim() || tags) {
          dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
          history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
          history.push('/');
        }
      };
    
      const handleKeyPress = (e) => {
        if (e.keyCode === 13) { //enters keyKode
          searchPost();
        }
      };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        <Grow in>
                <Container maxWidth='xl'>
                    <Grid className={classes.gridContainer} container  justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6}  md={9} marginTop={4}>
                            <Posts setCurrentId={setCurrentId}  />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} marginTop={2}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                                <ChipInput
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={(chip) => handleAddChip(chip)}
                                    onDelete={(chip) => handleDeleteChip(chip)}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
                            </AppBar>
                            <Form  currentId={currentId} setCurrentId={setCurrentId}/>
                            <Paper elevation={6} >
                                <Pagination />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;