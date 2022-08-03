import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:3000'})
const url = 'http://localhost:3000/posts';

//Why we use interceptors ?
    // We must control tokens verify from middleware every request wit axios
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` 
    }

    return req;
})

export const fetchPosts = () => API.get('/posts') ;
export const createPost = (newPost) => API.post('/posts', newPost) ;
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`, updatedPost) ;
export const deletePost = (id) => API.delete(`/posts/${id}`) ;
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
