import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions';
import Success from '../components/Success';
import Error from '../components/Error';
import Loading from '../components/Loading'


export default function Registerscreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirm_pass, setConfirmPass] = useState("");
    const dispatch = useDispatch()
    const registerstate = useSelector(state => state.registerUserReducer)
    const {error, loading, success} = registerstate

    function register(){
        if(password!==confirm_pass){
            alert("Password not matched")
        }
        else{
            const user={
                name,
                email,
                password
            }
            console.log(user);
            dispatch(registerUser(user))
        }
    }
    return (
        <div>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-5 mt-5 shadow-lg p-3 mb-2  rounded' style={{backgroundColor:'#004b7a'}}>
                    
                    <h2 style={{color:'white'}}>SIGN UP</h2>
                    {loading && (<Loading/>)}
                    {success && (<Success success="User Registered Successfully"/>)}
                    {error && (<Error error='Email already registered'/>)}
                    <div>
                        <input type='text' placeholder='Name' className='form-control' value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                        <input type='text' placeholder='Email' className='form-control' value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                        <input type='text' placeholder='Password' className='form-control' value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        <input type='text' placeholder='Confirm Password' className='form-control' value={confirm_pass} onChange={(e)=>{setConfirmPass(e.target.value)}} required/>
                        <button onClick={register} className='btn mt-5' > SIGN UP</button>
                        <p style={{color:'white'}}>Already have an account? <a href='/login' style={{color:'white'}}>SIGN IN</a></p>
                    </div>

                </div>

            </div>
        </div>
    )
}