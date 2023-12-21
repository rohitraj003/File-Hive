import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../redux/actioncCreators/authActionCreator";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const LoginForm = () => {
  const { loader } = useSelector((state) => ({
    loader: state.auth.loader,
  }));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in all fields.");
      return;
    }
    dispatch(signInUser(email, password, setSuccess));
  };
  useEffect(() => {
    if (success) {
      navigate("/dashboard");
    }
  }, [success]);
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group my-2">
        <input
          type="text"
          name="email"
          className="form-control px-3 py-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group my-2">
        <input
          type="password"
          name="password"
          className="form-control px-3 py-3"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="relative inline-flex items-center rounded-md w-full border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-md mt-2 mb-2 text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        {loader ? (
          <span className="m-auto">
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="22"
              visible={true}
            />
          </span>
        ) : (
          <span className="m-auto">Login</span>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
