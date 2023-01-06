import React,{useState} from 'react'
import Axios from 'axios'
import { useLocation } from 'react-router-dom';

function Login(props) {
    const location = useLocation();
    const [userData,setUserData]= useState();
    const socialLogin = async () => {
      const { search } = location;
    	try {
          
          const codeFromGoogle = search.slice(6) // to get the value of the code query param.
          console.log(codeFromGoogle)
          const res =await Axios.get(`http://localhost:9000/auth/google?code=${codeFromGoogle}&redirect_uri=http://localhost:3000/auth/google`)
          if (res.data) {
            // // request was successful
            // localStorage.setItem('token', res.data.token) // Store the token from this request in the local storage
            // this.props.history.push('/dashboard') // Log the user in and redirect to your app dashboard
            console.log(res.data.user);
            setUserData(res.data.user)
            
            
          } 
        } catch (err) {
          console.error(err)
        }
    }
    const {pathname} =location;
    if (pathname === '/auth/google') {
        // this ensures that the social login method is run only when the path is /auth/google
        socialLogin();
    } else {
        // the app continues with its normal logic
    }
  return (
    <div>Login {userData}</div>
  )
}

export default Login