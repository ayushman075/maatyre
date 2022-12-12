
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
import { useHistory, useParams } from "react-router-dom";






const initialState = {
    TripNumber:"",
    PRNO1:"",
    PRNO2:"",
    PRNO3:"",
    PRNO4:"",
    PRNO5:"",
    PRNO6:"",
    PRNO7:"",
    PRNO8:"",
    PRNO9:"",
    PRNO10:"",
    TripDate:"",
    TripTime:"",
    TripDriver:"",
    TripVehicle:"",
    TripStatus:"",
  };



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
var newTripNumber = 0 ;
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





export const EditTrip =()=>{


    const [state, setState] = useState(initialState);

    const {
        TripNumber,
        PRNO1,
        PRNO2,
        PRNO3,
        PRNO4,
        PRNO5,
        PRNO6,
        PRNO7,
        PRNO8,
        PRNO9,
        PRNO10,
        TripDate,
        TripTime,
        TripDriver,
        TripVehicle,
        TripStatus,
      } = state;


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        
          setDoc(doc(tripDetailsCollectionRef, `${id}`), state).then(
            function () {
              toast.success("Data Updated Successfully !!");
            }
          );
        
      };










      const { id } = useParams();

      const [tripDataFetch, setTripDataFetch] = useState([]);
      const TripDetailsFetchRef =doc(db, "TripDetails", `${id}`);
    
      useEffect(() => {
        const getTripDataFetch = async () => {
          getDoc(TripDetailsFetchRef).then((doc) => {
            setTripDataFetch(doc.data(), doc.id);
          });
        };
        getTripDataFetch();
      }, []);
      console.log(tripDataFetch);

      useEffect(() => {
        if (id) {
          setState({ ...tripDataFetch });
        } else {
          setState({ ...initialState });
        }
    
        return () => {
          setState({ ...initialState });
        };
      }, [id, tripDataFetch]);

  










    const pickuprequestCollectionRef = collection(db, "Pickup Request");
    // const tripNumberCollectionRef =doc(db,"TripDetails",newTripNumber);
    const tripDetailsCollectionRef =collection(db,"TripDetails");
    const [pickuprequests,setPickupRequests]=useState([]);
    const [tripDetails,setTripDetails]=useState([]);
    const [trip,setTrip]=useState([]);
    


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

    


                
                
              



    
    // const [visibleadd,setVisibleadd]=useState(true);
    // const [visibleremove,setVisibleremove]=useState(false);




  


    // useEffect(()=>{
    //     const getTrip=async ()=>{
    //         const data = await getDoc(pickuprequestCollectionRef);
    //         setTrip(
    //             data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) 
    //         );
    //     };
    //     getTrip();
    //     console.log(trip);
    // },[])
  






    useEffect(() => {
        const getPickupRequests = async () => {
          const data = await getDocs(pickuprequestCollectionRef);
          setPickupRequests(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
        };
        getPickupRequests();
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
                <input id="tpno" disabled={true} name="TripNumber" value={TripNumber || ""} className="tpn" style={{ maxWidth:"50px"} }></input>
                <label>P.R Numbers</label>
                <input disabled={true} className="prno" name="PRNO1" value={PRNO1 || ""}   id="prno1" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO2" value={PRNO2 || ""}  id="prno2" style={{ maxWidth:"50px"} }></input>
                <input disabled={true} className="prno" name="PRNO3" value={PRNO3 || ""}  id="prno3" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO4" value={PRNO4 || ""}  id="prno4" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO5" value={PRNO5 || ""}  id="prno5" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO6" value={PRNO6 || ""}  id="prno6" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO7" value={PRNO7 || ""}  id="prno7" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO8" value={PRNO8 || ""}  id="prno8" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO9" value={PRNO9 || ""}  id="prno9" style={{ maxWidth:"50px"}}></input>
                <input disabled={true} className="prno" name="PRNO10" value={PRNO10 || ""} id="prno10" style={{ maxWidth:"50px"}}></input>
                </div>
                <div>
                <label className="datetp">Date</label>
                <input  name="TripDate"
            value={TripDate || ""}
            onChange={handleInputChange}
            type="date"
            ></input>
                <label className="timetp">Time</label>
                <input 
                 name="TripTime"
                 value={TripTime || ""}
                 onChange={handleInputChange} type="time"></input>
                </div>
                <div>
                <label className="drivertp">Driver</label>
                <input
                 name="TripDriver"
                 value={TripDriver || ""}
                 onChange={handleInputChange}></input>

                                   
                <label className="vehicletp">Vehicle</label>
                <input 
                 name="TripVehicle"
                 value={TripVehicle || ""}
                 onChange={handleInputChange}></input>


                    <label>Status</label>
                    <input
                    name="TripStatus"
                    value={TripStatus || ""}
                    onChange={handleInputChange}
                    >
                    </input>


                </div>
                
                <input type="submit"></input>
                </div>
            </form>
        </div>
        <div className="tablediv">

        <div className="pendingpickuptab" >
        <table style={{ marginLeft:"50%" , Width:"80%"}} className="styled-table">
          <thead nowrap="nowrap">
            <tr className="thead">
            
           

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
              <th style={{ textAlign: "center" }}>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {pickuprequests.map((pickuprequest) => {
              if ( pickuprequest.PickupRequestNumber===PRNO1 || pickuprequest.PickupRequestNumber===PRNO2 ||pickuprequest.PickupRequestNumber===PRNO3 ||pickuprequest.PickupRequestNumber===PRNO4 ||pickuprequest.PickupRequestNumber===PRNO5 ||pickuprequest.PickupRequestNumber===PRNO6 ||pickuprequest.PickupRequestNumber===PRNO7 ||pickuprequest.PickupRequestNumber===PRNO8 ||pickuprequest.PickupRequestNumber===PRNO9 ||pickuprequest.PickupRequestNumber===PRNO10  && pickuprequest.FleetName !== undefined) {
                return (
                  <tr key={pickuprequest.PickupRequestNumber}>
                    
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
                   <td>{pickuprequest.Status}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>


        </div>
       
            </div>
    </div>
    );
        
        
    }