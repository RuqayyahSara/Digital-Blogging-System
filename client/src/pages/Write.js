import { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import spinner from "../loading.gif";
import PrivNavBar from "../components/PrivNavBar"
import ReactQuill from "react-quill";
import UsersContext from "../contexts/Users/UserContext";

import "react-quill/dist/quill.snow.css";

function Write() {
    let navigate = useNavigate();
    const usersContext = useContext(UsersContext);
    const { alert, showAlert, setLoading, loading, removeLoading, isAuth, auth } = usersContext;

    const [userData, setUserData] = useState({
        title: "",
        descrpition: "",
        category: "",
        img: null
    });

    useEffect(() => {
        if (!auth)
            isAuth()
        // eslint-disable-next-line
    }, [auth])

    const onChangeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading();
            let { data } = await axios.post("/blog", userData, { headers: { 'Content-Type': 'multipart/form-data' } });

            showAlert({
                type: "success",
                msg: data.success
            });
            removeLoading()
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 3000);
        } catch (err) {
            removeLoading()
            console.log(err.response)
            if (err.response.data.error) {
                showAlert({
                    type: "danger",
                    msg: err.response.data.error
                });
            }
            else if (err.response.data.errors) {
                showAlert({
                    type: "danger",
                    msg: err.response.data.errors[err.response.data.errors.length - 1].msg,
                });
            }
        }
    };

    return (
        <>
            <PrivNavBar />
            <section className="container-lg justify-content-center  px-lg-5 d-flex mt-3  flex-wrap">
                <div className="col-12 col-lg-9 ">
                    <form className="m-5" onSubmit={submitHandler}>
                        {alert !== null &&
                            <div className={`alert alert-${alert.type}`} role="alert">
                                {alert.msg}
                            </div>}
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Post Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control" id="title"
                                onChange={onChangeHandler} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categories" className="form-label">Categories</label>
                            <select
                                className="form-select" id="categories" aria-label="Default select example"
                                name="category"
                                onChange={onChangeHandler}
                            >
                                <option value="">Select</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Mental Wellness">Mental Wellness</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Travel">Travel</option>
                                <option value="Art">Art</option>
                            </select>
                        </div>
                        <label htmlFor="tags" className="form-label">Tags</label>
                        <div className="form-check mb-3">
                            <input type="checkbox" className="btn-check" id="btn-check1" autoComplete="off" />
                            <label className="btn btn-outline-secondary rounded-5 btn-sm" htmlFor="btn-check1">
                                Images
                            </label>
                            <input type="checkbox" className="btn-check" id="btn-check2" autoComplete="off" />
                            <label className="btn btn-outline-secondary rounded-5 btn-sm" htmlFor="btn-check2">
                                Art
                            </label>
                            <input type="checkbox" className="btn-check" id="btn-check3" autoComplete="off" />
                            <label className="btn btn-outline-secondary rounded-5 btn-sm" htmlFor="btn-check3">
                                Hand Carfts
                            </label>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Featured Image</label>
                            <input
                                className="form-control"
                                type="file" id="formFile"
                                name="img"
                                onChange={(e) => {
                                    setUserData({
                                        ...userData,
                                        [e.target.name]: e.target.files[0]
                                    })
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editor" className="form-label"> Post Content</label>
                            <ReactQuill className="editor" theme="snow" name="descrpition" value={userData.descrpition} onChange={e => {
                                setUserData({
                                    ...userData,
                                    descrpition: e
                                })
                            }} />
                        </div>
                        <div className='mt-5'>
                            <button type="submit" className="btn btn-secondary">
                                {loading && <img src={spinner} width="20px" alt='spinner' />}
                                Publish</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Write