
import { FETCH_ALL, DELETE, UPDATE,LIKE, CREATE, START_LOADING, END_LOADING, FETCH_BY_SEARCH } from "../constants/actionTypes";

export default (posts = [], action) => {

    switch (action.type) {
        // case START_LOADING:
        //     return { ...state, isLoading: true };
        // case END_LOADING:
        //     return { ...posts, isLoading: false };
        case FETCH_ALL:
            return action.payload
        case FETCH_BY_SEARCH:
            return action.payload ;
        case CREATE:
            return [...posts, action.payload]
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);   
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        default:
            return posts
            
    }
}

