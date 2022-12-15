import { Outlet, Navigate } from "react-router-dom";
import React, { useContext } from "react";
function PrivateRoute() {
  let token = JSON.parse(localStorage.getItem('token'))

  return !token ? <Navigate to="/login" /> : <Outlet />;
}

export default PrivateRoute;