import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {
    
    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState('Sign Up');
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(e)=>{
        e.preventDefault();

        let newUrl = url;
        if(currState === "Login"){
            newUrl += '/api/user/login';
        }else{
            newUrl += '/api/user/register';
        }
        const res = await axios.post(newUrl,data)

        if(res.data.success){
            setToken(res.data.token);
            localStorage.setItem("token",res.data.token);
            setShowLogin(false);
        }
        else{
            alert(res.data.msg);
        }
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container' action=''>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
                </div>
                <div className="login-popup-input">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
                    <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Passrord' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;
