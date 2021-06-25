import { useState } from "react";
import Field from "./Field";
import Button from "./Button";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios";
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setpasswordErrorMsg] = useState("");
    const history=useHistory();
    const handleEmailChange=(email)=>{
        setEmailError(false);
        setemail(email);
        // console.log("Email",email);
    }
    const handlePasswordChange=(password)=>{
        setPasswordError(false)
        setPassword(password);
        // console.log("Password",password);
    }
    const emptyString=(str)=>{
        return str.length?false:true;
    }
    const validateData=()=>{
        let flag=true;
        if(emptyString(email)){
            setEmailError(true);
            setEmailErrorMsg("This Field cannot be empty!");
            flag=false;
        }
        if(emptyString(password)){
            setPasswordError(true);
            setpasswordErrorMsg("This Field cannot be empty!");
            flag=false;
        }
        return flag;
    }
    const submitHandler=(event)=>{
        event.preventDefault();
        if(validateData()){
            loginUser();
        }
    }

    const loginUser=async()=>{
        const user={
            email:email,
            password:password
        }

        await axios.post("http://localhost:5000/user/login",user)
        .then(
            res=>{
                if(res.data.status==="ok"){
                    setPasswordError(false);
                    setEmailError(false);
                    localStorage.setItem("token",res.data.data);
                    // console.log(localStorage.getItem('token'));
                    history.push('/dashboard')
                    
                }else{
                    setPasswordError(true);
                    setEmailError(true);
                    setEmailErrorMsg("Email doesnt match!");
                    setpasswordErrorMsg("Password doesnt match!")    
                }
            }
        ).catch(
            err=>{
                setPasswordError(true);
                setEmailError(true);
                setEmailErrorMsg("Email doesnt match!");
                setpasswordErrorMsg("Password doesnt match!")
                // console.log("error",err)
            }
        )
    }

    return ( 
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={submitHandler}>
                <div className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="font-bold text-4xl left-0 pb-5 pt-5 text-indigo-600">
                    Login
                </h1>
                    <Field Placeholder="email" Label="Email" Type="email" Error={emailError} errorMessage={emailErrorMsg} handleChange={handleEmailChange}/>
                    <Field Placeholder="password" Label="Password" Error={passwordError} errorMessage={passwordErrorMsg} Type="password" handleChange={handlePasswordChange}/>
                    <div className="flex items-center justify-between">
                        
                        <div className="pt-4 pb-4">
                            <Link to="signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Don't Have an Account
                            </Link>
                        </div>
                        <div className="pt-4 pb-4">
                            <Button   btnName="Login"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Login;