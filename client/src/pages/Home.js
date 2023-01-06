import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar"
import PrivNavBar from '../components/PrivNavBar';
import UsersContext from "../contexts/Users/UserContext";
import Loading from "../components/Loading"
function Home() {
  const usersContext = useContext(UsersContext);
  const { posts, getPosts, loading } = usersContext;

  useEffect(() => {
    getPosts()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {
        JSON.parse(localStorage.getItem("token")) ? <PrivNavBar /> : <NavBar />
      }
      <section className="container-lg justify-content-center d-flex mt-5  flex-wrap">
        <div className="col-12 col-lg-9">
          <div className="d-flex flex-column mx-lg-5">
            <div>
 {loading && <Loading/>}
              {posts.length ? posts.map((post, i) => (
                <div className="m-lg-3 m-1 d-flex flex-column gap-3" key={i}>
                  <img src={post.img} className="rounded-4 w-100" alt="" />
                  <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
                    <h3 className="blog-link post-title" >{post.title}</h3>
                  </Link>

                  <div className="d-flex flex-wrap gap-3 text-muted">
                    <span> <i className="bi bi-person"> </i> {post.author}</span>
                    <span>Date: {new Date(post.date).toLocaleString()} </span>
                    <span>Categories: <Link className="text-decoration-none blog-link">{post.category}</Link></span>
                    <span>Tags: <Link className="text-decoration-none blog-link" >Photo</Link>,
                      <Link className="  text-decoration-none blog-link ">Image</Link></span>
                  </div>
                  <div
                     dangerouslySetInnerHTML={{ __html: post.descrpition.slice(0, 90)+"..." }}
                   />
                  <div>
                    <Link to={`/post/${post.id}`}>
                      <button className="btn btn-outline-secondary btn-md rounded-5">
                        Continue Reading
                      </button>
                    </Link>
                  </div>
                  <hr />
                </div>

              )) : <div style={{margin:"20%", color:"grey"}}><center>
                <h1>Nothing to Display...</h1>
                </center></div>}
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Home;
