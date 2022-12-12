import "./login.css";
import { db } from "../../firebase-config";
import { auth } from "../../firebase-config";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import{onAuthStateChanged,CurrentUser,signOut,signInWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import{Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { NavBar } from "../../components/navbar";


export const Login =()=>{

    
    const [loginId,setLoginId] =useState("");
    const[loginPass,setLoginPass]=useState("");
    const[user]=useAuthState(auth);
    const navigate=useNavigate();
    const logout = async () =>{
        await signOut(auth);
        navigate('/');
 };
    

    const login= async (e)=>{
        e.preventDefault();
    if(!loginId ){toast.error("Please Enter Login Id !!")}
    else if (!loginPass){toast.error("Please Enter Password !!")}
    else{
        try{
            const userlogin= await signInWithEmailAndPassword(
                auth,loginId,loginPass
            );
           
            navigate('/');
            toast.success("LoggedIn Sucessfully !!");
        
        }catch(error){
            toast.error(error.message);
        }
        
    }
    };
    


return(



<div>
    
    {!user &&(
        <>
     <h1>Login Page</h1>
    <Toaster/>
    <form>
        <div className="loginformdiv">
        <label>User ID</label>
        <input placeholder="Enter User Id" onChange={(event)=>{setLoginId(event.target.value);}}></input>
        <label>Password</label>
        <input type="password" placeholder="Enter Password" onChange={(event)=>{setLoginPass(event.target.value);}}></input>
        <button className="submitbtn" onClick={login} >LOGIN</button>
        </div>
    </form>
    </>)}
    {user &&(
        <>
        <div>
        <h1>Home Page</h1>
        <button className="logoutbtn" onClick={logout}>LOGOUT</button>
        </div>
        <div className="tab">
         <Link to="/workorder" className="tabdiv" id="workordertab">Work Order</Link>
         <Link to="/workorderdownload" className="tabdiv" id="workorderdownloadtab">Download Work Order</Link>
         <Link to="/pendingpickuprequests" className="tabdiv" id="pendingpickuprequesttab">Pending Request</Link>
        <Link to="/ongoingpickuprequests" className="tabdiv" id="ongoingpickuprequesttab">OnGoing Request</Link>
        <Link to="/completedpickuprequests" className="tabdiv" id="completedpickuprequesttab">Completed Request</Link>
        <Link to="/tripplanner" className="tabdiv" id="tripplannertab">Trip Planner</Link>
        </div>
        </>)}

    
</div>
)


    
    
}