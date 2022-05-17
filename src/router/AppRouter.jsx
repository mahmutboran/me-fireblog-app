import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../component/Navbar";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import UpdateBlog from "../pages/UpdateBlog";
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";
import Login from "../pages/Login";



const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/" index  element={<Dashboard />} />

        <Route path="/profile" element={<PrivateRouter/>}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/new-blog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>
        <Route path="/update-blog/:id" element={<PrivateRouter />}>
          <Route path="" element={<UpdateBlog />} />
        </Route>
        <Route path="/detail" element={<PrivateRouter />}>
          <Route path="" element={<Detail />} />
        </Route>
  
      </Routes>
    </Router>
  );
};

export default AppRouter;
