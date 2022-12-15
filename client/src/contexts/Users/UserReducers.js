import { SET_ALERT, REMOVE_ALERT, SET_LOADING, REMOVE_LOADING, SET_ERROR, SET_POSTS, SET_POST, SET_AUTH } from "../types";

const UserReducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alert: action.payload
            }
        case REMOVE_ALERT:
            return {
                ...state,
                alert: null
            };

        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case REMOVE_LOADING:
            return {
                ...state,
                loading: false,
            };
        case SET_ERROR:
            return {
                ...state,
                errorData: action.payload
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_POST:
            return {
                ...state,
                post: action.payload
            }
        case SET_AUTH:
            return {
                ...state,
                auth: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer