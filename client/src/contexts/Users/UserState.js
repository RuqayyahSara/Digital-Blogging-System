import { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducers"
import axios from "axios";
import { SET_ALERT, REMOVE_ALERT, SET_LOADING, REMOVE_LOADING, SET_ERROR, SET_POSTS, SET_POST, SET_AUTH } from "../types.js";

function UserState(props) {
    const initialState = {
        alert: null,
        loading: false,
        errorData: {},
        posts: [],
        post: null,
        auth: null
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };
    const removeLoading = () => {
        dispatch({ type: REMOVE_LOADING });
    };

    const setErrorData = (data) => {
        dispatch({ type: SET_ERROR, payload: data });
    };

    const showAlert = (data) => {
        dispatch({
            type: SET_ALERT,
            payload: data
        })
        setTimeout(() => {
            dispatch({
                type: REMOVE_ALERT,
            })
        }, 4000);
    };

    const getPosts = async () => {
        try {
setLoading()
            let { data } = await axios.get("/blogs")
            dispatch({
                type: SET_POSTS,
                payload: data
            })
removeLoading()
        } catch (err) {
            window.location.href = "/"
            localStorage.removeItem('token')
            console.log(err.response.data)
        }
    }

    const getPost = async (id) => {
        try {
            let { data } = await axios.get(`/blog/${id}`)
            dispatch({
                type: SET_POST,
                payload: data
            })
        } catch (err) {
            console.log(err.response.data)
        }
    }

    const setAuth = (data) => {
        dispatch({
            type: SET_AUTH,
            payload: data
        })
    };

    const isAuth = async () => {
        try {
            let { data } = await axios.get("/auth")
            setAuth(data.payload)
        } catch (error) {
            setAuth(null)
            localStorage.removeItem('token')
            window.location.href = "/"
        }
    }

    const logout = () => {
        setAuth(null)
        localStorage.removeItem('token')
        window.location.href = "/"
    }

    return (
        <UserContext.Provider value={{
            errorData: state.errorData,
            loading: state.loading,
            alert: state.alert,
            posts: state.posts,
            auth: state.auth,
            post: state.post,
            removeLoading,
            setErrorData,
            setLoading,
            showAlert,
            logout,
            getPosts,
            getPost,
            isAuth
        }}>
            {props.children}
        </UserContext.Provider>
    )


}

export default UserState;
