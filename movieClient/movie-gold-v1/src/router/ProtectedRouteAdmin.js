import {useEffect} from "react";
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import axios from "axios";

const ProtectedRouteROLE_ADMIN = (props) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
 
  function presentPage() {
    navigate(-1);
  }
  if (!token) return <Navigate to="/" />;

  const decodedToken = jwtDecode(token);

    const rolesString = decodedToken.roles; 

    const rolesArray = rolesString.split(',').map(role => role.trim());


  useEffect(()=>{
    if(!rolesArray.includes('ROLE_ADMIN')){ 
      presentPage()
      }
  },[token && jwtDecode(token).role!== "ROLE_ADMIN"])

  const decodedData = jwtDecode(token);


  if (rolesArray.includes('ROLE_ADMIN')) {
    return <Outlet {...props} />;
  }
 else if(rolesArray.includes('ROLE_ADMIN')){
   presentPage()
  }
};

export default ProtectedRouteROLE_ADMIN;