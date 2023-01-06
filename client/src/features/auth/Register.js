import React,{useRef,useState,useEffect} from 'react'

import { useNavigate } from 'react-router-dom'


import { useRegisterMutation } from './authApiSlice'

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    

    useEffect(()=>{
        userRef.current.focus()
    },[])
    useEffect(()=>{
        setErrMsg('')
    },[user,pwd])

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const userDataMessage = await register({user,pwd}).unwrap()
            setUser('');
            setPwd('')
            navigate('/login')
        }catch(error){
            if (!error?.originalStatus) {
                setErrMsg('No server response');
            } else if (error.originalStatus === 400) {
                setErrMsg('Missing username or password');
            } else if (error.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else if (error.originalStatus === 409) {
                setErrMsg('Select another username');
            }else {
                setErrMsg('Register failed');
            }
            errRef.current.focus();
        }
    }
    const handleUserInput = (event) => setUser(event.target.value)

    const handlePwdInput = (event) => setPwd(event.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="register">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Register User</h1>
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
                <button>Register</button>
            </form>
        </section>
    )

  return content;
}

export default Register