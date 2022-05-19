import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../utils/firebaseUtil";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  // const loginWithGoogle = () => {
  //   googleProvider.setCustomParameters({ prompt: "select_account" });
  //   signInWithPopup(auth, googleProvider)
  //     .then((res) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
  const unSubscribe = 
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      } else {
        setCurrentUser(false);
      }
    });
    return unSubscribe
 
}, []);

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <AuthContext.Provider
      value={{ currentUser, login, signup, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
