import { useState, useEffect,useTable } from "react";
import { Form } from "react-router-dom";
import {
    collection,
    getDocs,
    setDoc,
    doc,
    state,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "../../firebase-config";
  import './generatetripreport.css';
  import { auth } from "../../firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import {  NavBar } from "../../components/navbar";







export const GenerateTripReport =()=>{

    const[user]=useAuthState(auth);
const [driver,setDriver]=useState();
const [fromDate,setFromDate]=useState();
const [toDate,setToDate]=useState();
const [tripReports,setTripReports] = useState([]);
const workOrderCollectionRef = collection(db, "Work Order");
const[otrint,setotrint]=useState();
const[oftrint,setoftrint]=useState();

 

useEffect(() => {
    
}, []);

 <NavBar title="Pickup Request"/>


useEffect(() => {
    const getTripReports = async () => {
      const data = await getDocs(workOrderCollectionRef);
      setTripReports(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getTripReports();
  }, []);


const generatereport =  (e) =>{
    e.preventDefault();
    const getTripCount = async () => {
        const ontheroadcount =document.getElementById('ontheroaddata').getElementsByTagName('tr');
        const ontheroadint = ontheroadcount.length;
           setotrint(ontheroadint);
        const offtheroadcount =document.getElementById('offtheroaddata').getElementsByTagName('tr');
        const offtheroadint = offtheroadcount.length;
           setoftrint(offtheroadint);
        };
        getTripCount();

};


return(
    <div>
        {user &&(
        <>
    <form className="tripreportgenerateform" onSubmit={generatereport}>
        <label>Enter Driver to Generate Trip Report</label>
        <input className=""
        placeholder="Enter Driver Name"
        onChange={(event) => {
        setDriver(event.target.value);
                        }} />
        <label>From Date</label>
        <input type="date" onChange={(event) => {
        setFromDate(event.target.value);
                        }}/>
                        <label>To Date</label>
        <input type="date" onChange={(event) => {
        setToDate(event.target.value);
                        }}/>
                        
        <button type="submit" className="generaterptbtn" 
                          >Generate Report</button>                
    </form>



   
        

        <div style={{ marginTop: "20px"}}>
            <h3>On The Road Tyres</h3>
        <table id="ontheroaddata" className="styled-table">
            <thead>
                <tr>
                    <th style={{ textAlign: "center"}}>Work Order No.</th>
                    <th style={{ textAlign: "center"}}>Tyre No.</th>
                    <th style={{ textAlign: "center"}}>Fleet Name</th>
                    <th style={{ textAlign: "center"}}>Pickup Site</th>
                    <th style={{ textAlign: "center"}}>Driver</th>
                    <th style={{ textAlign: "center"}}>Vehicle</th>
                    <th style={{ textAlign: "center"}}>Tyre Make</th>
                    <th style={{ textAlign: "center"}}>Tyre Size</th>
                    <th style={{ textAlign: "center"}}>Tyre Serial No.</th>
                    <th style={{ textAlign: "center"}}>Remarks</th>
                    <th style={{ textAlign: "center"}}>Status</th>
                    <th style={{ textAlign: "center"}}>Pickup Date-Time</th>
                    

                </tr>
            </thead>
            
            <tbody>
            {tripReports.map((tripReport) => {
                const datestr=new Date(tripReport.PickupDate);
                const fromdatestr=new Date (fromDate);
                const todatestr=new Date(toDate);


                


                if (tripReport.Driver===driver && datestr>=fromdatestr && datestr<=todatestr && tripReport.TyreSize!=="10.00R20"
               
               
                ) {
                    
       return(
            
           

        
        <tr key={tripReport.TyreIdNumber}>
            
            <td>{tripReport.WorkOrderNumber}</td>
            <td>{tripReport.TyreIdNumber}</td>
            <td>{tripReport.FleetName}</td>
            <td>{tripReport.PickupSite}</td>
            <td>{tripReport.Driver}</td>
            <td>{tripReport.Vehicle}</td>
            <td>{tripReport.TyreMake}</td>
            <td>{tripReport.TyreSize}</td>
            <td>{tripReport.TyreSerialNumber}</td>
            <td>{tripReport.Remarks}</td>
            <td>{tripReport.Status}</td>
            <td>{tripReport.PickupDate +" "+ tripReport.PickupTime}</td>
                                    

        </tr>
       );
    }
    })}
    </tbody>
        </table>
        
    </div>




    <div style={{ marginTop: "20px"}}>
            <h3>Over The Road Tyres</h3>
        <table id="offtheroaddata" className="styled-table">
            <thead>
                <tr>
                    <th style={{ textAlign: "center"}}>Work Order No.</th>
                    <th style={{ textAlign: "center"}}>Tyre No.</th>
                    <th style={{ textAlign: "center"}}>Fleet Name</th>
                    <th style={{ textAlign: "center"}}>Pickup Site</th>
                    <th style={{ textAlign: "center"}}>Driver</th>
                    <th style={{ textAlign: "center"}}>Vehicle</th>
                    <th style={{ textAlign: "center"}}>Tyre Make</th>
                    <th style={{ textAlign: "center"}}>Tyre Size</th>
                    <th style={{ textAlign: "center"}}>Tyre Serial No.</th>
                    <th style={{ textAlign: "center"}}>Remarks</th>
                    <th style={{ textAlign: "center"}}>Status</th>
                    <th style={{ textAlign: "center"}}>Pickup Date-Time</th>
                    

                </tr>
            </thead>
           
            <tbody>
            {tripReports.map((tripReport) => {
                const datestr=new Date(tripReport.PickupDate);
                const fromdatestr=new Date (fromDate);
                const todatestr=new Date(toDate);
                if (tripReport.Driver===driver && datestr>=fromdatestr && datestr<=todatestr && tripReport.TyreSize!=="11R22.5" && tripReport.TyreSize!=="295/90R20"
               
                ) {
       return(
             

        
        <tr key={tripReport.TyreIdNumber}>
            <td>{tripReport.WorkOrderNumber}</td>
            <td>{tripReport.TyreIdNumber}</td>
            <td>{tripReport.FleetName}</td>
            <td>{tripReport.PickupSite}</td>
            <td>{tripReport.Driver}</td>
            <td>{tripReport.Vehicle}</td>
            <td>{tripReport.TyreMake}</td>
            <td>{tripReport.TyreSize}</td>
            <td>{tripReport.TyreSerialNumber}</td>
            <td>{tripReport.Remarks}</td>
            <td>{tripReport.Status}</td>
            <td>{tripReport.PickupDate +" "+ tripReport.PickupTime}</td>
                                    

        </tr>
       );
    }
    })}
    </tbody>
        </table>
        
    </div>

<div>
     
    <h3>Total Counting of Tyres</h3>
<table className="styled-table">
    <thead>
        <tr>
        <th style={{ textAlign: "center"}}>On the Road Tyres</th>
        <th style={{ textAlign: "center"}}>Off the Road Tyres</th>

        </tr>
    </thead>
    <tbody>
        
        <tr>
            <td>
               {otrint-1}
            </td>
            <td>
               {oftrint-1}
            </td>
        </tr>
    </tbody>
</table>
</div>
</>)}
        </div>

);
    
    
};