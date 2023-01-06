import React,{useRef,useState,useEffect} from 'react'



import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import GLogin from './GLogin'


const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()


    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(()=>{
        userRef.current.focus()
    },[])
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const userData = await login({user,pwd}).unwrap()
            dispatch(setCredentials({...userData,user}));
            setUser('');
            setPwd('')
            navigate('/welcome')
        }catch(error){
            if (!error?.originalStatus) {
                setErrMsg('No server response');
            } else if (error.originalStatus === 400) {
                setErrMsg('Missing username or password');
            } else if (error.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login failed');
            }
            errRef.current.focus();
        }
    }
    const handleUserInput = (event) => setUser(event.target.value)

    const handlePwdInput = (event) => setPwd(event.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>User Login</h1>
            <p>&nbsp;</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={user}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={handlePwdInput}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <div className='linkSeperate'>
            <GLogin/>
            </div>
        </section>
    )

  return content;
}

export default Login