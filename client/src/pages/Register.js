import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar"
import spinner from "../loading.gif";
import UsersContext from "../contexts/Users/UserContext";

function Register() {

  let navigate = useNavigate();
  const usersContext = useContext(UsersContext);
  const { alert, showAlert, setLoading, loading, removeLoading } = usersContext;
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      let { data } = await axios.post("/register", userData);

      showAlert({
        type: "success",
        msg: data.success,
      });
      removeLoading()
      navigate("/login", { replace: true });
    } catch (err) {
      removeLoading()
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
      <NavBar />
      <section className="d-flex align-items-center justify-content-center  " style={{ height: "90vh" }}>
        <div className="col-10 col-md-4 bg-white px-3 py-5 rounded-5">
          {alert !== null &&
            <div className={`alert alert-${alert.type}`} role="alert">
              {alert.msg}
            </div>}

          <h2 className="text-secondary mb-3">Register</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputText" className="form-label">Name</label>
              <input type="text" name="username" className="form-control" id="exampleInputText" onChange={onChangeHandler} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" onChange={onChangeHandler} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={onChangeHandler} />
            </div>

            <button type="submit" className="btn btn-secondary">
              {loading && <img src={spinner} width="20px" alt='spinner'/>}
              Sign Up</button>
          </form>
          <div className="d-flex justify-content-center">
            <Link className="blog-link mt-3" to="/login" >Already have Account</Link>

          </div>
        </div>
      </section>
    </>
  )
}

export default Register