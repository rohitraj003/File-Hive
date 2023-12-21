import React from "react";
import { Nav } from "../../components/HomePageComponents/index";
import bg from "./bg2.jpg";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOutUser } from "../../redux/actioncCreators/authActionCreator";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(SignOutUser());
    navigate("/");
  };
  const dispatch = useDispatch();
  return (
    <>
      <Nav />
      {/* Large Screen */}
      <div className="lg:block hidden">
        <div className="flex flex-row-reverse justify-around px-44 pt-10">
          <div>
            <img src={bg} className="w-full " />
          </div>
          <div>
            <h1 className="text-left text-7xl font-bold mt-10 text-gray-800">
              Welcome to <br /> File{" "}
              <span className="text-indigo-500">Hive</span>
            </h1>
            <p className="mt-4">
              Say goodbye to cluttered desktops and disorganized folders. Our
              file management system is designed to help you stay organized and
              manage your files with ease.Streamline your workflow and improve
              productivity with our file management system
            </p>
            {isAuthenticated ? (
              <>
                <button
                  type="button"
                  className="relative mt-4 inline-flex items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => navigate("/dashboard")}
                >
                  <span>Go to Dashboard </span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="relative mt-4 inline-flex items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => navigate("/login")}
                >
                  <span>Get Started</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Small Screen */}
      <div className="lg:hidden block">
        <div className="flex flex-row-reverse justify-around px-6 pt-8">
          <div>
            <h1 className="text-left text-5xl font-bold mt-10 text-gray-800">
              Welcome to <br /> File{" "}
              <span className="text-indigo-500">Hive</span>
            </h1>
            <p className="mt-4">
              Say goodbye to cluttered desktops and disorganized folders. Our
              file management system is designed to help you stay organized and
              manage your files with ease.Streamline your workflow and improve
              productivity with our file management system
            </p>
            <div className="flex items-center">
              <div className="flex-shrink-0 space-x-3 mt-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <Link to="/dashboard" className="text-white">
                          Dashboard
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={logout}
                      >
                        <span>Logout</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <Link className="text-white" to="/login">
                        Login
                      </Link>
                    </button>
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <Link className="text-white" to="/register">
                        Register
                      </Link>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
