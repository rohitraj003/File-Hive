import React from "react";
import LoginForm from "../../../components/AuthComponents/LoginForm";
import LoginVector from "./img/LoginVector.jpg";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen p-8 lg:p-14">
      <div classname="">
        <img className="lg:block hidden w-[600px] ml-4" src={LoginVector} />
      </div>
      <div className="flex flex-column py-16">
        <h1 className="text-4xl text-gray-800 font-semibold">Welcome Back!</h1>
        <h3 className="mt-3 text-gray-800">
          Log in with your credentials to start using the app.
        </h3>
        <div className="mt-4">
          <LoginForm />
          <span className="text-gray-800">
            Don't have an account yet ?
            <Link className="text-indigo-400 font-semibold ml-2" to="/register">
              Register Now
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
