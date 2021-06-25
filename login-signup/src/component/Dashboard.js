import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Dashboard = () => {
    const [flag, setFlag] = useState(false);
    const [username, setUsername] = useState("");
    window.onstorage=()=>{
        if(flag)setFlag(false)
        else setFlag(true);
    }
    const history=useHistory();
    useEffect(()=>{
        const auth=async()=>{
            await axios.get("http://localhost:5000/user/authenticate",{
                headers:{
                    'token':localStorage.getItem('token')
                    }
                }
            ).then(
                res=>{
                    setUsername(res.data.username);
                    console.log(username)
                }
            ).catch(
                err=>{
                    history.push('/');
                }
            )
        }
        auth();
    },[history,flag,username]);
    return ( 
        <>
            {/* {console.log(response)} */}
            <div className="bg-blue-200 flex flex-col h-screen">
            <div className="bg-yellow-500 py-2 hidden sm:block ">

            
            <nav className="relative select-none bg-grey lg:flex lg:items-stretch w-full">
                <div className="flex flex-no-shrink items-stretch h-12">
                    <p href="#" className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-grey-dark">Dashboard</p>
                    <button className="block lg:hidden cursor-pointer ml-auto relative w-12 h-12 p-4">
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg>
                    </button>
                </div>
                <div className="lg:flex lg:items-stretch lg:flex-no-shrink lg:flex-grow">
                    <div className="lg:flex lg:items-stretch lg:justify-end ml-auto">
                    <button onClick={()=>{
                            localStorage.removeItem('token')
                            history.push('/')
                        }} className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center hover:bg-red-800">LOGOUT</button>
                    </div>
                </div>
            </nav>
               
            </div>   
                {/* <nav className="bg-gray-400 ">
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <button onClick={()=>{
                            localStorage.removeItem('token')
                            history.push('/')
                        }} className="bg-red-500 hover:bg-red-800 font-bold rounded p-4">
                            Logout
                        </button>
                    </div>
                </nav> */}
                <div className="row-span-5 border-2 border-black flex-grow inline-block align-middle">
                    <h1 className="text-center hover:underline text-bold text-5xl">
                        {`You are logged in as ${username}`}
                    </h1>
                </div>
            </div>
        </>
    );
}
 
export default Dashboard;