import "./tripplanner.css";
import { useState, useEffect} from "react";
import{Link} from "react-router-dom"
import {
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  state,
  updateDoc,
  increment
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { WorkOrder } from "../workorder/workorder";
import { Toaster, toast } from "react-hot-toast";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";



var Prno1=0;
var Prno2=0;
var Prno3=0;
var Prno4=0;
var Prno5=0;
var Prno6=0;
var Prno7=0;
var Prno8=0;
var Prno9=0;
var Prno10=0;
var newTripNumber ;
var ttprno1;
var ttprno2;
var ttprno3;
var ttprno4;
var ttprno5;
var ttprno6;
var ttprno7;
var ttprno8;
var ttprno9;
var ttprno10;


export const TripPlanner =()=>{


    const pickuprequestCollectionRef = collection(db, "Pickup Request");
    const tripNumberCollectionRef =doc(db,"TripDetails","TripNumber");
    const tripDetailsCollectionRef =collection(db,"TripDetails");
    const [pickuprequests,setPickupRequests]=useState([]);
    const [tripDetails,setTripDetails]=useState([]);
    const [PRNO1,setPRNO1]=useState([]);
    const [PRNO2,setPRNO2]=useState([]);
    const [PRNO3,setPRNO3]=useState([]);
    const [PRNO4,setPRNO4]=useState([]);
    const [PRNO5,setPRNO5]=useState([]);
    const [PRNO6,setPRNO6]=useState([]);
    const [PRNO7,setPRNO7]=useState([]);
    const [PRNO8,setPRNO8]=useState([]);
    const [PRNO9,setPRNO9]=useState([]);
    const [PRNO10,setPRNO10]=useState([]);


    const [tDate,settDate]=useState({});
    const [tTime,settTime]=useState({});
    const [tDriver,settDriver]=useState("Select a Driver");
    const [tVehicle,settVehicle]=useState({});


    const tripData ={
        TripNumber:newTripNumber,
        PRNO1:Prno1,
        PRNO2:Prno2,
        PRNO3:Prno3,
        PRNO4:Prno4,
        PRNO5:Prno5,
        PRNO6:Prno6,
        PRNO7:Prno7,
        PRNO8:Prno8,
        PRNO9:Prno9,
        PRNO10:Prno10,
        TripDate:tDate,
        TripTime:tTime,
        TripDriver:tDriver,
        TripVehicle:tVehicle,
        TripStatus:"Trip Assigned"
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if(Prno1===0  && Prno2===0 && Prno3===0 && Prno4===0 && Prno5===0 && Prno6===0 && Prno7===0 && Prno8===0 && Prno9===0 && Prno10===0  )
        {
            toast.error("Please select atleast one PR to create a trip !!");
        }
        else{
            
               
          
                setDoc(doc(tripDetailsCollectionRef, `${newTripNumber}`), tripData).then(
                  function () {
                    toast.success("Data Updated Successfully !!");
                  }
                );


                 updateDoc(tripNumberCollectionRef, {
                    TripNumber: increment(1)
                });
                
              
        }
    
    }



    
    // const [visibleadd,setVisibleadd]=useState(true);
    // const [visibleremove,setVisibleremove]=useState(false);




    useEffect(() => {
        const getTripNumber = async () => {
          getDoc(tripNumberCollectionRef).then((doc) => {
             newTripNumber = parseInt(doc.data().TripNumber) +1;
            document.getElementById("tpno").value=newTripNumber;
          });
        };
        getTripNumber();
  }, []);


  






    useEffect(() => {
        const getPickupRequests = async () => {
          const data = await getDocs(pickuprequestCollectionRef);
          setPickupRequests(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        };
        getPickupRequests();
      }, []);



      useEffect(() => {
        const getTripDetails = async () => {
          const data = await getDocs(tripDetailsCollectionRef);
          setTripDetails(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        };
        getTripDetails();
      }, []);



      

      



    
   









    
    
    
    return(
    <div className="tripphead">
        <h1>Trip Planner</h1>
        
        <div>
            <Toaster/>
            <form autoComplete="on" onSubmit={handleSubmit}>
                <div className="tripfromdiv">
                <div>
                <label >Trip Number</label>
                <input id="tpno" disabled={true}  className="tpn" style={{ maxWidth:"50px"} }></input>
                <label>P.R Numbers</label>
                <input disabled={true} className="prno" value={Prno1 || ""}  name="prno1" id="prno1" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno2 || ""}  id="prno2" style={{ maxWidth:"50px"} }></input>
                <input disabled={true} className="prno" value={Prno3 || ""}  id="prno3" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno4 || ""}  id="prno4" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno5 || ""}  id="prno5" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno6 || ""}  id="prno6" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno7 || ""}  id="prno7" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno8 || ""}  id="prno8" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno9 || ""}  id="prno9" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" value={Prno10 || ""} id="prno10" style={{ maxWidth:"50px"}}></input>
                </div>
                <div>
                <label className="datetp">Date</label>
                <input  onChange={(event) => {
        settDate(event.target.value);
                        }} className="datetp" type="date"></input>
                <label className="timetp">Time</label>
                <input 
                 onChange={(event) => {
                    settTime(event.target.value);
                                    }} className="timetp" type="time"></input>
                </div>
                <div>
                <label className="drivertp">Driver</label>
                <input
                 onChange={(event) => {
                    settDriver(event.target.value);
                                    }} className="drivertp"></input>

                                   
                <label className="vehicletp">Vehicle</label>
                <input 
                 onChange={(event) => {
                    settVehicle(event.target.value);
                                    }} className="vehicletp"></input>
                </div>
                
                <input type="submit"></input>
                </div>
            </form>
        </div>
        <div className="tablediv">

        <div className="pendingpickuptab" >
        <table className="styled-table">
          <thead nowrap="nowrap">
            <tr className="thead">
            <th style={{ textAlign: "center" }}>Action</th> 
           

              <th style={{ textAlign: "center" }}>PR&nbsp;No.</th>
              <th style={{ textAlign: "center" }}>Fleet&nbsp;Name</th>
              <th style={{ textAlign: "center" }}>Pickup&nbsp;Site</th>
              <th style={{ textAlign: "center" }}>
                Tentative Pickup&nbsp;Date
              </th>
              
              
              <th style={{ textAlign: "center" }}>
                Request&nbsp;Date&nbsp;Time
              </th>
              <th style={{ textAlign: "center" }}>No. of Tyres</th>
              
            </tr>
          </thead>
          <tbody>
            {pickuprequests.map((pickuprequest) => {
              if (pickuprequest.Status === "Pickup Requested"  && pickuprequest.FleetName !== undefined) {
                return (
                  <tr key={pickuprequest.PickupRequestNumber}>
                    <td>

                        <button id="addpr"  onClick={e=>{
                            if(Prno1===0
                                && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber

                                ){
                            document.getElementById("prno1").value=pickuprequest.PickupRequestNumber
                            Prno1=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno2===0
                            && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno2").value=pickuprequest.PickupRequestNumber
                            Prno2=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno3===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno3").value=pickuprequest.PickupRequestNumber
                            Prno3=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno4===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno4").value=pickuprequest.PickupRequestNumber
                            Prno4=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno5===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno5").value=pickuprequest.PickupRequestNumber
                            Prno5=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno6===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno6").value=pickuprequest.PickupRequestNumber
                            Prno6=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno7===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno7").value=pickuprequest.PickupRequestNumber
                            Prno7=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno8===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno8").value=pickuprequest.PickupRequestNumber
                            Prno8=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno9===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                                && Prno10!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno9").value=pickuprequest.PickupRequestNumber
                            Prno9=pickuprequest.PickupRequestNumber;
                        }
                        else if(Prno10===0
                            && Prno2!==pickuprequest.PickupRequestNumber
                                && Prno3!==pickuprequest.PickupRequestNumber
                                && Prno4!==pickuprequest.PickupRequestNumber
                                && Prno5!==pickuprequest.PickupRequestNumber
                                && Prno6!==pickuprequest.PickupRequestNumber
                                && Prno7!==pickuprequest.PickupRequestNumber
                                && Prno8!==pickuprequest.PickupRequestNumber
                                && Prno9!==pickuprequest.PickupRequestNumber
                                && Prno1!==pickuprequest.PickupRequestNumber
                            ){
                            document.getElementById("prno10").value=pickuprequest.PickupRequestNumber
                            Prno10=pickuprequest.PickupRequestNumber;
                        }
                        }} style={{ backgroundColor:"greenyellow" ,borderColor:"greenyellow", marginBottom:"2px" }}>ADD</button>
                        <button onClick={e=>{
                            if(Prno1===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno1").value="";
                                Prno1=0;
                            }
                            else if(Prno2===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno2").value="";
                                Prno2=0;
                            }
                            else if(Prno3===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno3").value="";
                                Prno3=0;
                            }
                            else if(Prno4===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno4").value="";
                                Prno4=0;
                            }
                            else if(Prno5===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno5").value="";
                                Prno5=0;
                            }
                            else if(Prno6===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno6").value="";
                                Prno6=0;
                            }
                            else if(Prno7===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno7").value="";
                                Prno7=0;
                            }
                            else if(Prno8===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno8").value="";
                                Prno8=0;
                            }
                            else if(Prno9===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno9").value="";
                                Prno9=0;
                            }
                            else if(Prno10===pickuprequest.PickupRequestNumber){
                                document.getElementById("prno10").value="";
                                Prno10=0;
                            }

                        }}
                        style={{ backgroundColor:"orangered" ,borderColor:"orangered", marginBottom:"2px" }}
                        >REMOVE</button>
                       
                        </td>
                    <td>{pickuprequest.PickupRequestNumber}</td>
                    <td>{pickuprequest.FleetName}</td>
                    <td>{pickuprequest.PickupSite}</td>
                    <td>
                      {pickuprequest.TentativePickupDate +
                        " " +
                        pickuprequest.TentativePickupTime}
                    </td>
                    
                    <td>
                      {pickuprequest.RequestDate +
                        " " +
                        pickuprequest.RequestTime}
                    </td>
                    <td>{parseInt(pickuprequest.TyreQuantity1)+parseInt(pickuprequest.TyreQuantity2)+parseInt(pickuprequest.TyreQuantity3)+parseInt(pickuprequest.TyreQuantity4)+parseInt(pickuprequest.TyreQuantity5)+parseInt(pickuprequest.TyreQuantity6) }</td>
                   
                  </tr>
                );
              }
            })}
          </tbody>
        </table>


        </div>
        <div className="triptable">
        <table className="styled-table" >
          <thead nowrap="nowrap">
            <tr className="thead">
            <th style={{ textAlign: "center" }}>Action</th> 
            <th style={{ textAlign: "center" }}>Trip No.</th> 
           

              <th style={{ textAlign: "center" }}>PR&nbsp;Nos.</th>
              <th style={{ textAlign: "center" }}>Driver</th>
              <th style={{ textAlign: "center" }}>Vehicle</th>
              <th style={{ textAlign: "center" }}>
                Trip&nbsp;Date
              </th>
              
              
              <th style={{ textAlign: "center" }}>
            Trip&nbsp;Time
              </th>
              
              
            </tr>
          </thead>

            <tbody>
            {tripDetails.map((tripdetail) => {
                if(tripdetail.PRNO1!==0){ttprno1=tripdetail.PRNO1}
                if(tripdetail.PRNO2!==0){ttprno2=tripdetail.PRNO2}
                if(tripdetail.PRNO3!==0){ttprno3=tripdetail.PRNO3}
                if(tripdetail.PRNO4!==0){ttprno4=tripdetail.PRNO4}
                if(tripdetail.PRNO5!==0){ttprno5=tripdetail.PRNO5}
                if(tripdetail.PRNO6!==0){ttprno6=tripdetail.PRNO6}
                if(tripdetail.PRNO7!==0){ttprno7=tripdetail.PRNO7}
                if(tripdetail.PRNO8!==0){ttprno8=tripdetail.PRNO8}
                if(tripdetail.PRNO9!==0){ttprno9=tripdetail.PRNO9}
                if(tripdetail.PRNO10!==0){ttprno10=tripdetail.PRNO10}
                

              if (
                // tripdetail.Status === "Trip Assigned"  && 
                tripdetail.PRNO1 !== undefined) {
                return (
                  <tr key={tripdetail.TripNumber}>
                    <td> <Link to={`/edittrip/${tripdetail.TripNumber}`} state={{Trip:tripdetail.TripNumber}} >
                <button className="btn">EDIT</button>
                </Link>
                </td>
                    <td>
                    {tripdetail.TripNumber}
                        </td>
                        <td>
                            {ttprno1} {ttprno2} {ttprno3} {ttprno4} {ttprno5} {ttprno6} {ttprno7} {ttprno8} {ttprno9} {ttprno10} 
                             </td>
                        <td>{tripdetail.TripDriver}</td>
                        <td>{tripdetail.TripVehicle}</td>
                        <td>{tripdetail.TripDate}</td>
                        <td>{tripdetail.TripTime}</td>

                        </tr>
                        )}
                    })}
                </tbody>





            </table>
            </div>
            </div>
    </div>
    );
        
        
    }