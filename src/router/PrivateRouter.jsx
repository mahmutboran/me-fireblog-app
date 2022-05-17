import React, { useContext } from "react";
import { AuthContext, useAuth } from "../context/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {


  // const { currentUser } = useContext(AuthContext);
  const { currentUser } = useAuth();
  console.log(currentUser);
  console.log(currentUser?.displayName );
  return currentUser?.displayName !== undefined ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} />
  );
  //return currentUser ? <Outlet /> : <Navigate to={"/login"}/>
};

export default PrivateRouter;
