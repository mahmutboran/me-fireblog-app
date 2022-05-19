import React, { useContext } from "react";
import { AuthContext, useAuth } from "../context/AuthContextProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PrivateRouter = () => {
  let location = useLocation()


//  const user = useContext(AuthContext);
//  console.log(user.currentUser)
  const { currentUser } = useAuth();
  console.log(currentUser);
  console.log(currentUser?.uid);
  if (!currentUser) {
    
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  else{
    return <Outlet />
  }
};

export default PrivateRouter;
