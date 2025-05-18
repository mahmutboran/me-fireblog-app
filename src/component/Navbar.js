import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import blog from "../assets/blog.png"
import { Link,  useNavigate} from "react-router-dom";
import { AuthContext } from '../context/AuthContextProvider';


export default function MenuAppBar() {
  
  const navigate = useNavigate() 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {currentUser,logout}=React.useContext(AuthContext)





  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=()=>{
    setAnchorEl(null);
    logout()
  }

  const handleDashboard=()=>{
    setAnchorEl(null);
    navigate("/")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color= "warning"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDashboard}
          >
          <img src={ blog } alt="logo" width={60}  />
          </IconButton>
          <Typography variant="h6"  component="div" sx={{ flexGrow: 1,fontFamily:"Girassol",cursor:"pointer" }} onClick={()=> navigate("/") }>
           ———<span style={{ fontSize:"30px",color:"wheat" }} >{"<Boran&/>"}</span>BLOG———           
            </Typography>
            <Typography>

{currentUser?.displayName}
</Typography>
 
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>


              {currentUser?.email? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
            
                <Link to="/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to="/new-blog">
                  <MenuItem onClick={handleClose}>New Blog</MenuItem>
                </Link>
                <Link to="/login" >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
              </Menu>):(
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/login">
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>
                <Link to="/register">
                  <MenuItem onClick={handleClose}>Register</MenuItem>
                </Link>
              </Menu>)}
            </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}











