import logo from "../logo.png";
import{Link} from "react-router-dom"
import './navbar.css';
import { auth } from "../firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";


export const NavBar =(props)=>{

    const[user]=useAuthState(auth);
    const navigate=useNavigate();
    const logout = async () =>{
        await signOut(auth);
        navigate('/');
 };

 


return(
    <div className="navdiv">
        <h1 className="logoname">Maa Tyre Retreads</h1>
        <h2>{props.title}</h2>
        <div class="dropdown">
  <button class="dropbtn" id="pickuprequesttab" className="tabdiv" >Pickup Request</button>
  <div class="dropdown-content">
    <Link to="/pendingpickuprequests">Pending Request</Link>
    <Link to="/ongoingpickuprequests">OnGoing Request</Link>
    <Link to="/completedpickuprequests">Completed Request</Link>
  </div>
</div>
        <div className="tab">
        <Link to="/workorder/" className="tabdiv" id="workordertab">Work Order</Link>
        
        {user &&(
            <>
            <button className="logoutbtn" onClick={logout}>LOGOUT</button>
            </>
        )}
        
        </div>
        
    </div>
);

}