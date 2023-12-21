import React from "react";
import RegisterForm from "../../../components/AuthComponents/RegisterForm";
import LoginVector from "../Login/img/LoginVector.jpg";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="grid grid-col-1 lg:grid-cols-2 h-screen p-8 lg:p-14">
      <div classname="">
        <img className="lg:block hidden w-[600px] ml-4" src={LoginVector} />
      </div>
      <div className="flex flex-column py-16">
        <h1 className="text-4xl text-gray-800 font-semibold">
          Create your account
        </h1>
        <h3 className="mt-3 text-gray-800">
          Get your files organized by registering now.
        </h3>
        <div className="mt-4">
          <RegisterForm />
          <span className="text-gray-800">
            Already have an account?
            <Link className="text-indigo-400 font-semibold ml-2" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
