import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from '../actions/userActions'
import Success from '../components/Success'
import Error from '../components/Error'
import Loading from '../components/Loading'

export default function Loginscreen() {
  const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const loginstate =useSelector(state=>state.loginUserReducer)
    const {loading,error,success}=loginstate

    useEffect(() => {
      if (localStorage.getItem("currentUser")) {
        window.location.href = "/"
      }
    }, [])

    const loginHandler = (e) => {
      e.preventDefault();
      const user = { email, password }
      dispatch(loginUser(user))
    }

    return (
      <div>
        <div className='row justify-content-center mt-5'>
          <div className='col-md-5 mt-5 shadow-lg p-3 mb-2  rounded' style={{backgroundColor:'#004b7a'}}>
            <h2 style={{color:'white'}}>SIGN IN</h2>
            {loading && (<Loading/>)}
            {success && (<Success success="Successful"/>)}
            {error && (<Error error='Invalid Credentials'/>)}
           
            <div>
              <form onSubmit={loginHandler}>
                <input type='text' placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type='text' placeholder='Password' className='form-control' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className='btn mt-5'> SIGN IN</button>
                
              </form>
              <p style={{color:'white'}}>Don't have an account? <a href='/register' style={{color:'white'}}>SIGN UP</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Login />
  )
}