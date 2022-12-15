import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import UsersContext from '../contexts/Users/UserContext';
function PrivNavBar() {
    const usersContext = useContext(UsersContext);
    const { logout } = usersContext;

    return (
        <nav className="navbar navbar-expand-lg  bg-white border-bottom ">
            <div className="container-lg px-5">
                <Link className="navbar-brand" to="/">
                    Blog
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/write">
                                Write
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" onClick={logout}>
                                <strong><em>Logout</em></strong>
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-secondary" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
            {/* <button className="btn btn-primary" type="submit">
                Logout
            </button> */}
        </nav>
    );
}

export default PrivNavBar