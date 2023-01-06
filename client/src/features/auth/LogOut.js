import React from 'react'
import { Link } from 'react-router-dom'
import { useLogOutQuery } from './authApiSlice'

const LogOut = () => {
    
    const {data,isLoading,isSuccess,isError,error} = useLogOutQuery()
    
    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        
        content = (
            <section className='logout'>
                <h1>User Logged Out</h1>
                <Link to="/">Back to Home</Link>
            </section>
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content
}

export default LogOut