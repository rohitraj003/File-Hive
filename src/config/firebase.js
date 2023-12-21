import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQsDc0bhAMKzd_qFC9xvt5DxZT0PjqxoY",
  authDomain: "file-management-system-16450.firebaseapp.com",
  projectId: "file-management-system-16450",
  storageBucket: "file-management-system-16450.appspot.com",
  messagingSenderId: "422299294279",
  appId: "1:422299294279:web:7ab7de54a27d741407af62",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
