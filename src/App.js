import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
// import Home from "./pages/HomePage/Home";
// import Login from "./pages/AuthPages/Login/Login";
// import Register from "./pages/AuthPages/Register/Register";
// import Dashboard from "./pages/DashboardPage/Dashboard";
import { Login, Home, Dashboard, Register } from "./pages/Index";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkIsLoggedIn } from "./redux/actioncCreators/authActionCreator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, []);

  return (
    <div className="App h-screen">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        /* /* means nested routes */
      </Routes>
    </div>
  );
};

export default App;
