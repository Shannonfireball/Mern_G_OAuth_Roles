import React,{useRef,useState,useEffect} from 'react'
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useGAuthLoginMutation } from './authApiSlice';
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice';
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string';


const GLogin = () => {
      const queryParams = queryString.stringify({
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope:  [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      redirect_uri: 'http://localhost:3000/login', 
      auth_type: "rerequest",
      display: "popup", 
      response_type: "code"
  }); 
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${queryParams}`;

  const location = useLocation();
  const {search,pathname}= location;
  
  
  const [errMsg, setErrMsg] = useState('')
  const [userInfo,setUserInfo] = useState(null)
  const [GAuthLogin, { isLoading }] = useGAuthLoginMutation()
  const dispatch = useDispatch()
  const errRef = useRef()
  const navigate = useNavigate()

  
  const handleGLogin = async()=>{
    
    try{
        const codeFromGoogle = search.slice(6);
        console.log(codeFromGoogle)
        let params = new URLSearchParams(search)
        console.log(params.get("code"))
        // const userData = await Axios.get(`http://localhost:9000/auth/google?code=${codeFromGoogle}&redirect_uri=http://localhost:3000/login`);
        const userData = await GAuthLogin({code:params.get("code"),redirect_uri:'http://localhost:3000/login'}).unwrap()
        console.log({...userData})
        dispatch(setCredentials({...userData}))
        setUserInfo(userData)
        navigate('/welcome')

        
        
        


    }catch(error){
        if (!error?.originalStatus) {
            setErrMsg('No server response');
        } else if (error.originalStatus === 400) {
            setErrMsg('Email verification failed.');
        } else if (error.originalStatus === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Google login failed');
        }
        errRef.current.focus();
        }
    }
    // if(search){
    //     handleGLogin();
    // }
    useEffect(()=>{
        // if(userInfo){
        //     navigate('/welcome')
        // }
        if(search){
            handleGLogin();
        }
    },[search]);
    const openLink = ()=>window.open(url,"_self");
    // console.log("env",process.env.REACT_APP_CLIENT_ID);
    const content= isLoading?<h2>...loading</h2>:(
        <>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <span onClick={openLink} className="googleImg"/>
        </>
      )
  return content;
}

export default GLogin