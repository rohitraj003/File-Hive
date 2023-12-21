import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../../redux/actioncCreators/authActionCreator";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
const RegisterForm = () => {
  const { loader } = useSelector((state) => ({
    loader: state.auth.loader,
  }));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cpassword) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (password !== cpassword) {
      toast.warning("Passwords do not match.");
      return;
    }

    dispatch(signUpUser(name, email, password, setSuccess));
  };
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success]);
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input
          type="text"
          name="name"
          className="form-control  px-3 py-3"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="email"
          name="email"
          className="form-control  px-3 py-3"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="password"
          name="password"
          className="form-control  px-3 py-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="password"
          name="cpassword"
          className="form-control  px-3 py-3"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="relative inline-flex items-center rounded-md w-full border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        {loader ? (
          <span className="m-auto">
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          </span>
        ) : (
          <span className="m-auto"> Register </span>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
