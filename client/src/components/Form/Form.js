import React, {useEffect, useState} from 'react';
import useStyles from './styles';
import { TextField, Button, Paper, Typography } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';
import { createPost, updatePost} from '../../actions/posts';
import { useHistory } from 'react-router-dom';

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({ title:"", message:"", tags:"", selectedFile:""});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post)setPostData(post)
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (currentId === 0) {
          dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
          }
        };

    const clear = () => {
        setCurrentId(null);
        setPostData({title:"", message:"", tags:"", selectedFile:""});
    }

    if (!user?.result?.name) {
        return (
          <Paper className={classes.paper} elevation={6}>
            <Typography variant="h6" align="center">
              Please Sign In to create your own memories and like other's memories.
            </Typography>
          </Paper>
        );
      }
    return(
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'> {`${currentId ? 'Editing' : 'Creating'}`} a Memory</Typography>
                <TextField variant='outlined' name='title' label='Title' fullWidth value={postData.title} onChange={(e) => setPostData({...postData, title:e.target.value})}/>
                <TextField variant='outlined' name='message' label='Message' fullWidth value={postData.message} onChange={(e) => setPostData({...postData, message:e.target.value})}/>
                <TextField variant='outlined' name='tags' label='Tags(Coma seperated)' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags:e.target.value.split(',')})}/>
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
                <Button className={classes.button} variant='contained'  color='primary' size='large' type='submit' fullWidth >Submit</Button>
                <Button  variant='contained'  color='secondary' size='small' onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;