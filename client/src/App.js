
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./Utils/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Footer from "./components/Footer";

import UserState from "./contexts/Users/UserState";

function App() {
  return (
    <UserState>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={< Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<Single />} />

        <Route element={<PrivateRoute />}>
          <Route path="/write" element={<Write />} />
        </Route>
      </Routes>
      <Footer />
    </UserState>
  );
}

export default App;
