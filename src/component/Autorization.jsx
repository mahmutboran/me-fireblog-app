// import { Field, Form, Formik } from "formik";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContextProvider";
// import * as Yup from "yup";
// import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

// import blokPng from "../assets/blok.png";
// import registerImg from "../assets/blok.png";
// import googleImg from "../assets/google.png";
// import { Box } from "@mui/system";


// const SignupSchema = Yup.object().shape({
//   email: Yup.string("Enter your E--mail")
//     .email("Invalid E--mail address")
//     .required("Required"),
//   password: Yup.string("Enter your PASSWORD").required("PASSWOD Required"),
// });

// const LoginAndRegisterForm = (props) => {
    
//     const {handleChange,handleBlur,errors,isSubmitting,values,touched} = props
//     const[email,setEmail]=useState()
//     const[password,setPassword] = useState()
//     const displayName = `${email}`
  
//     const navigate = useNavigate()
  
//     const handleSubmit=(e)=>{
//       e.preventDefault()

//       console.log(email,password); 
//     }
//   const {loginWithGoogle} =useAuth()
//     const handleGoogle = () => {
//         loginWithGoogle()
//     }
//   return (
//     <Container    className='login-wrapper' >


//     <Container
//       maxWidth="sm"
//       style={{ borderRadius: "10px", boxShadow: "10px 10px 10px black",backgroundColor:"white" }}
//     >
//       <Box
//         sx={{
//           height: "100vh",
//           marginTop: "20vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar
//           alt="register_img"
//           src={registerImg}
//           sx={{ width: 180, height: 180 }}
//           style={{ backgroundColor: "rgb(24,101,129)" }}
//         />
//         <Typography
//           variant="h6"
//           component="h6"
//           sx={{ m: 3 }}
//           style={{ color: "rgb(24,101,129)" }}
//         >
//           ──── {props.method} ────
//         </Typography>

//         <form onSubmit={handleSubmit} >
//           <Grid container spacing={4}>
//             <Grid item xs={12}>
//               <TextField
//                 id="mail"
//                 label="email"
//                 name="email"
//                 variant="outlined"
//                 type="email"
//                 autoComplete="on"
//                 onChange={(e)=>setEmail(e.target.value)}
//                 required
//                 fullWidth
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 id="password"
//                 label="password"
//                 name="password"
//                 variant="outlined"
//                 type="password"
//                 autoComplete="current-password"
//                 onChange={(e)=>setPassword(e.target.value)}
//                 required
//                 fullWidth
//               />
//             </Grid>

//             <Grid item xs={12} container rowSpacing={0}>
//               <Button
//                 style={{ backgroundColor: "rgb(24,101,129)" }}
//                 variant="contained"
//                 color="primary"
//                 sx={{ m: 1 }}
//                 fullWidth
//                 type="submit"
//               >
//                 {props.method}
//               </Button>

//               <Button
//                 style={{ backgroundColor: "white", color: "black" }}
//                 variant="contained"
//                 color="primary"
//                 sx={{ m: 1 }}
//                 fullWidth
//                 type="submit"
//                 onClick={handleGoogle}
//               >
//                 with{" "}
//                 <img
//                   src={googleImg}
//                   alt="googleImg"
//                   style={{ width: "50px", marginLeft: "3px" }}
//                 />
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//     </Container>
//   );
// };

// const Autorization = ({method}) => {
//   const navigate = useNavigate();

//   const { signup, login, currentUser } = useAuth();
//   useEffect(() => {
//     if (currentUser) {
//       navigate("/");
//     }
//   }, [currentUser, navigate]);

//   return (
//     <div>
//       <Formik
//         initialValues={{
     
//           email: "",
//           password:""
//         }}
//         validationSchema={SignupSchema}
//         onSubmit={(values, actions) => {
//           if (method==="Login") {
//               login(values.email,values.password).then(()=>{
//                   toastSuccessNotify(`${method} Successfully performed`)
//                   navigate("/")
//                   actions.setSubmitting(false)
//               }).catch((error)=>{
//                   toastErrorNotify(error.message)
//                   actions.setSubmitting(false)
//                   actions.resetForm()
//               })
//           }else{
//             signup(values.email,values.password).then(()=>{
//                 toastSuccessNotify(`${method} Successfully performed`)
//                 navigate("/")
//                 actions.setSubmitting(false)
//             }).catch((error)=>{
//                 toastErrorNotify(error.message)
//                 actions.setSubmitting(false)
//                 actions.resetForm()
//             })
//           }
//           console.log(values);
//         }}
//         component={(props)=><LoginAndRegisterForm method={method} {...props}/>}
//       ></Formik>
//     </div>
//   );
// };

// export default Autorization;
