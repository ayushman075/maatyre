import React,{useState} from "react";
import './updateworkorder.css';
import './updateworkorder.css';
import { WOEditForm } from "./WOUpdateForm";



export const AddEditWO =()=>{
    

    
    // const [newWorkOrder,setNewWorkOrder] = useState({WorkOrderNumber:"",TyreIdNumber:"",FleetName:"",PickupSite:"",Driver:"",Vehicle:"",TyreMake:"",TyreSize:"",TyreSerialNumber:"",Remarks:"",Status:""});
    
    // const workorderCollectionRef= collection(db,"Work Order");
   


    
    
    return(
    <div className="form" style={{marginTop:"10px"}}>
        <h1 >Update Work Order</h1>
        <WOEditForm/>
       
    </div>
    );
};