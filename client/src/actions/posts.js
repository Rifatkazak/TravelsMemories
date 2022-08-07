import * as api from '../api/index.js';

import { FETCH_ALL, DELETE, UPDATE,LIKE, CREATE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_POST, COMMENT } from "../constants/actionTypes";


//Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
  
      dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: { post: data } });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

      console.log("data",data)
  
      dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

//Create Post Action
export const createPost = (post, history) => async(dispatch) => {

    try {
      dispatch({ type: START_LOADING });
        const {data} = await api.createPost(post);

        history.push(`/posts/${data.id}`);
        
        dispatch({type: CREATE, payload: data}) ;
    } catch (error) {
        console.log(error.message);
    }
}
//Update Post Action
export const updatePost = (id, post) => async(dispatch) => {
    try {
      const {data}  = await api.updatePost(id, post);
      dispatch({type: UPDATE, payload: data}) ;
    } catch (error) {
      console.log(error.message);
    }
}
//Delete Post Action
export const deletePost = (id) => async(dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({type: DELETE, payload: id}) ;
    } catch (error) {
      console.log(error.message);
    }
}

export const likePost = (id) => async(dispatch) => {
  try {
    const {data}  = await api.likePost(id);
    dispatch({type: LIKE, payload: data}) ;
  } catch (error) {
    console.log(error);
  }
}

export const commentPost = (value, id) => async (dispatch) => {

  try {
    
    const { data } = await api.comment(value, id);

    console.log("comment-data", data)

    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

