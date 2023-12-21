import * as types from "../actionsTypes/authActionsTypes";
import fire from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};
const setLoader = (payload) => {
  return {
    type: types.SET_LOADER,
    payload,
  };
};

const logoutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

//action Creator

export const signInUser = (email, password, setSuccess) => (dispatch) => {
  dispatch(setLoader(true));
  fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        loginUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
      setSuccess(true);
      dispatch(setLoader(false));
    })
    .catch((error) => {
      toast.error("Invalid Credentials");
      dispatch(setLoader(false));
    });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  dispatch(setLoader(true));
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      fire
        .auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          const currentUser = fire.auth().currentUser;
          dispatch(
            loginUser({
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              isAuthenticated: true,
            })
          );
          dispatch(setLoader(false));
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          dispatch(setLoader(false));
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.warning("Email already in use!");
          }
          if (error.code === "auth/invalid-email !") {
            toast.error("Invalid email");
          }
          if (error.code === "auth/weak-password") {
            toast.error("Weak password!");
          }
          dispatch(setLoader(false));
        });
    });
};

export const SignOutUser = () => (dispatch) => {
  fire
    .auth()
    .signOut()
    .then(() => {
      dispatch(logoutUser());
    });
  dispatch(logoutUser());
  // navigate("/");
};

export const checkIsLoggedIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};
