import { useState } from "react";
import Field from "./Field";
import Button from "./Button";
// import Alert from "./Alert";
import Popup from "./Popup";
import axios from "axios";
import { Link,useHistory } from 'react-router-dom';

const Signup = (props) => {
    const [email, setemail] = useState("");
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const [emailError, setemailError] = useState(false);
    const [userNameError, setuserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setconfirmPasswodErrorr] = useState(false);
    const [loginReRoute, setLoginReRoute] = useState(false);

    //errormessage satae
    const [userNameErrorMsg, setUserNameErrorMsg] = useState("");
    const [emailErrorMsg, setEmailErrorMsg] = useState("");
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
    const [confirmPasswordErrorMsg, setconfirmPasswordErrorMsg] = useState();
    const history=useHistory();

    const handleEmailChange=(email)=>{
        setemail(email);
        setemailError(false);
    }
    const handlePasswordChange=(password)=>{
        setPassword(password);
        setPasswordError(false);
    }
    const handleConfirmPasswordChange=(cPassword)=>{
        setconfirmPassword(cPassword);
        setconfirmPasswodErrorr(false);
    }
    const handleUserNameChange=(username)=>{
        setuserName(username);
        setuserNameError(false);
    }

    const emptyStringChecker=(str)=>{
        if(str==="") return true;
        return false;
    }

    const goToLogin=()=>{
        history.push('/');
    }

    const validateData=()=>{
        let flag=true;
        if(emptyStringChecker(userName)){
            setuserNameError(true);
            setUserNameErrorMsg("This field cannot be empty!");
            flag=false;
        }else if(userName.length<4){
            setuserNameError(true);
            setUserNameErrorMsg("USERNAME must be 4 characters long!");
            flag=false;
            
        }
        if(emptyStringChecker(email)){
            setemailError(true);
            setEmailErrorMsg("This field cannot be empty!");
            flag=false;
        }else if(!(email.includes('@'))){
            setemailError(true);
            setEmailErrorMsg("Incorrect email");
            flag=false;
        }
        if(confirmPassword!==password){
            setconfirmPasswodErrorr(true);
            setPasswordError(true);
            setconfirmPasswordErrorMsg("Password not the same!");
            setPasswordErrorMsg("Password not the same!");
            flag=false;
        }
        if(emptyStringChecker(password)){
            setPasswordError(true);
            setPasswordErrorMsg("This field cannot be empty!");
            flag=false;
        }else if(password.length<4){
            setPasswordError(true);
            setPasswordErrorMsg("Password should be 4 characters long");
            flag=false;
        }
        if(emptyStringChecker(confirmPassword)){
            setconfirmPasswodErrorr(true);
            setconfirmPasswordErrorMsg("This field cannot be empty!");
            flag=false;
        }else if(confirmPassword.length<4){
            setconfirmPasswodErrorr(true);
            setconfirmPasswordErrorMsg("Password should be 4 characters long");
            flag=false;
        }

        
        return flag
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        if(validateData()){
            registerUser();
        }
    }

    const registerUser=async()=>{
        const user = {
            username:userName,
            email:email,
            password:confirmPassword
        };

        await axios.post("http://localhost:5000/user/signup",user)
        .then(res=>setLoginReRoute(true))
        .catch(err=>
            {
                setemailError(true);
                setEmailErrorMsg("Email already in use");
            }    
        );

    }

    return ( 
        <div className="w-full h-screen flex justify-center items-center">
            {loginReRoute?
                <Popup goToLogin={goToLogin} title={"SUCCESSFUL"} message={"Account Created SUCCESSFUL"}/>:""
            }
            <form onSubmit={submitHandler}>
                <div className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8">
                    <h1 className="font-bold text-4xl left-0 pb-5 pt-5 text-indigo-600">
                        Signup
                    </h1>
                    <Field Placeholder="Username" Label="Username" Type="text" Error={userNameError} errorMessage={userNameErrorMsg} handleChange={handleUserNameChange}/>

                    <Field Placeholder="email" Label="Email" Type="email" Error={emailError} errorMessage={emailErrorMsg} handleChange={handleEmailChange}/>
                    
                    <Field Placeholder="password" Label="Password" Error={passwordError} errorMessage={passwordErrorMsg} Type="password" handleChange={handlePasswordChange}/>

                    <Field Placeholder="Confirm Password" Label="Confirm Password" Error={confirmPasswordError} errorMessage={confirmPasswordErrorMsg} Type="password" handleChange={handleConfirmPasswordChange}/>
                    
                    <div className="flex items-center justify-between">
                        
                        <div className="pt-4 pb-4">
                            <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                                Already have an Account?
                            </Link>
                        </div>
                        <div className="pt-4 pb-4">
                            <Button btnName="Signup"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
 
export default Signup;