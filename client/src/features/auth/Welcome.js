import { useSelector } from "react-redux";
import { selectCurrentUser,selectCurrentToken } from "./authSlice";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React from 'react'
import { logOut } from "./authSlice";
import { useLogOutQuery } from "./authApiSlice";

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    
    const welcome = user?`Welcome ${user}`:"Welcome";
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // const LogOutUser = ()=>{
    //     dispatch(logOut());
    //     navigate('/logout');
    // };
    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            
            <p><Link to="/userslist">Go to the Users List</Link></p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            
            <div className="flexGrow logout">
            {/* <Link to="/logout">Log Out</Link> */}
            {/* <button onClick={LogOutUser}>Log Out</button> */}
            </div>
        </section>
    )
  return content;
}

export default Welcome