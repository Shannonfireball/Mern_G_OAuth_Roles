import React from 'react'
import { NavLink } from 'react-router-dom'
import { selectCurrentUser } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from '../features/auth/authSlice';
const NavBar = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOutUser = ()=>{
    dispatch(logOut());
    navigate('/logout');
  };
  const hamBar =()=>{
    if(document.getElementById('navbar').className === 'navbar'){
      document.getElementById('navbar').className += ' responsive'
    }else{
      document.getElementById('navbar').className = 'navbar'
    }
  }
  return (
    <div className='navbar' id="navbar">
        {/* <NavLink to="/" style={isActive=>({'backgroundColor':isActive?"white":'black'})}>home</NavLink> */}
        <NavLink to="/" >Home</NavLink>
        <div className='navRight'>{user?<NavLink onClick={LogOutUser} to="/logout" >LogOut</NavLink>:<NavLink to="/login" >Login</NavLink>}</div>
        <NavLink to="/register" >Register</NavLink>
        <NavLink to="/welcome" >Welcome</NavLink>
        <a className='icon' onClick={hamBar}><i className='fa fa-bars' ></i></a>
    </div>
  )
}

export default NavBar