import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignOutUser } from "../../redux/actioncCreators/authActionCreator";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Nav() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(SignOutUser());
    navigate("/");
  };
  return (
    <Disclosure as="nav" className="bg-white drop-shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center space-x-3">
                  <img
                    className="block h-8 w-auto lg:hidden  rounded-full"
                    src="https://cdn.imgbin.com/23/2/0/imgbin-file-manager-computer-icons-file-explorer-android-android-EYnmY2ThcMFwCBWEDXCg97xKX.jpg"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block rounded-full "
                    src="https://cdn.imgbin.com/23/2/0/imgbin-file-manager-computer-icons-file-explorer-android-android-EYnmY2ThcMFwCBWEDXCg97xKX.jpg"
                    alt="Your Company"
                  />
                  <p className="text-gray-800" style={{ cursor: "pointer" }}>
                    File-Hive
                  </p>
                </div>
              </div>
              {/* Large Screen */}
              <div className="flex items-center mt-2">
                <div className="flex-shrink-0 space-x-3">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-3">
                        <p className="text-gray-800">
                          Welcome :
                          <span className="font-semibold">
                            &nbsp; {user.displayName}
                          </span>
                        </p>
                        <button
                          type="button"
                          className="lg:block hidden relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <Link to="/dashboard" className="text-white">
                            Dashboard
                          </Link>
                        </button>
                        <button
                          type="button"
                          className="lg:block hidden relative inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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
                        className="lg:block hidden relative inline-flex items-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <Link className="text-white" to="/login">
                          Login
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="lg:block hidden relative inline-flex items-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
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

          <Disclosure.Panel className="md:hidden">
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <Avatar name={user.email} size="40px" round="50px" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
