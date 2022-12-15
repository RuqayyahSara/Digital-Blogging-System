import React, { useContext, useEffect } from 'react'
import NavBar from "../components/NavBar"
import PrivNavBar from '../components/PrivNavBar';
import { useParams } from 'react-router-dom';
import UsersContext from "../contexts/Users/UserContext";
import Loading from "../components/Loading"

function Single(id1) {
    let { id } = useParams(id1)
    const usersContext = useContext(UsersContext);
    const { post, getPost } = usersContext;

    useEffect(() => {
        getPost(id)
        // eslint-disable-next-line
    }, [])
    return (
        <>
            {
                JSON.parse(localStorage.getItem("token")) ? <PrivNavBar /> : <NavBar />
            }
            <section className="container-lg  justify-content-center d-flex mt-5  flex-wrap">
                <div className="col-12 col-lg-9">
                    <div className="d-flex flex-column mx-lg-5">
                        <div>
                            {post ? (<div className="m-lg-3 m-1 d-flex flex-column gap-3">
                                <h3 className="post-title">{post && post.title}</h3>

                                <div className="d-flex flex-wrap gap-3 text-muted">
                                    <span> <i className="bi bi-person"> </i>{post && post.user.username}</span>
                                    <span>Date: {post && new Date(post.date).toLocaleString()}</span>
                                    <span>Categories: {post && post.category}</span>
                                    <span>Tags: Photo,Image</span>
                                </div>
                                <div>
                                    <img src={post && post.img} className="rounded-4 w-100 my-3" alt="" />
                                    <div
                                        dangerouslySetInnerHTML={{ __html: (post && post.descrpition) }}
                                    />
                                </div>

                            </div>) : <Loading />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Single