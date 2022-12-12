import { useState, useEffect ,useRef,react, useCallback} from "react";
import { db } from "../../firebase-config";
import {collection, getDocs,query,orderBy,where} from "firebase/firestore";
import './workorderdownload.css';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import jsPDF from 'jspdf';
import { Toaster, toast } from "react-hot-toast";
import html2canvas from "html2canvas";


export const WorkOrderDownload =()=>{


const[user]=useAuthState(auth);
const workorderCollectionRef= collection(db,"Work Order");
const [wono,setWono]=useState({});
const [workOrders,setWorkOrders]=useState([]);




const handleGeneratePdf = () => {
    const doc = new jsPDF(
       "p","pt","a4"

   
   );
   doc.html(document.querySelector("#reportdiv"),{
       callback:function(pdf){
           pdf.setFontSize(5);
           pdf.save("WorkOrder.pdf");
          

       }
   })
   
}


const handleGeneratePdfs = () => {
    const input =document.getElementById('reportdiv');
    html2canvas(input).then((canvas)=>{
        const imgData=canvas.toDataURL('image/png');
        const pdf =new jsPDF();
        pdf.addImage(imgData,'PNG',0,0);
        pdf.margins={
            top:40,
            left:20,
            width:700
        }
        pdf.save("WorkOrder.pdf");
    });
}


var FleetName;
var PickupSite;
var PickupDate;
var won;
var prno;
var Driver;
var Vehicle;







const generatereport =  (e) =>{
    e.preventDefault();

    {workOrders.map((workOrder) => {

        if(workOrder.TyreIdNumber === wono+"01"){
                FleetName=workOrder.FleetName;
                PickupSite=workOrder.PickupSite;
                PickupDate=workOrder.PickupDate;
                won=workOrder.WorkOrderNumber;
                prno=workOrder.PickupRequestNumber;
                Driver=workOrder.Driver;
                Vehicle=workOrder.Vehicle;

              
                
               
                document.getElementById("fnfield").value=FleetName;
                document.getElementById("psfield").value=PickupSite;
                document.getElementById("pdfield").value=PickupDate;
                document.getElementById("wonofield").value=won;
                document.getElementById("dfield").value=Driver;
                document.getElementById("vfield").value=Vehicle;
                document.getElementById("prfield").value=prno;
                
        }


    })}


}


useEffect(()=>{
        
        const getWorkOrders= async () => {
            const workorderQuery = query(workorderCollectionRef, )
            const data = await getDocs (workorderQuery);
            setWorkOrders(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
        }
        getWorkOrders()
    }, [])




// const sendRequest =useCallback(async()=>{
//     // if(isSending) return
//     // setIsSending(true);

//     // //actual request here

    
//     //      const getWorkOrders= async () => { 
//     //         const workorderQuery = query(workorderCollectionRef, where("WorkOrderNumber", "==", wono))
//     //         const data = await getDocs (workorderQuery);
//     //         setWorkOrders(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
//     //     }
//     //     getWorkOrders()
    

//     // setIsSending(false)
//     console.alert(wono);
// },[isSending])


    return(
        <div>
            <div>
                <label>Work Order Number</label>
                <input placeholder="Enter Work Order Number" name="wonoreport" onChange={(event) => {
        setWono(event.target.value);
                        }}>

                        </input>
                        <button onClick={generatereport}>Fetch</button>
                        <button onClick={handleGeneratePdfs}>Download PDF</button>
                        
                {/* <button type="submit"  onClick={sendRequest} >GUJnjdnjf</button> */}
            
            </div>
            <div>
            <Toaster />
            </div>
            <div className="reportdiv" id="reportdiv">
            <div className="woformattop">
            <div className="wobranding">
                <div className="h1div">
                Maa Tyre Retreads
               </div>
               <p>
                <div>
                Near Krishna Iron, Sarora Road, Urla Industrial Area
                Raipur (C.G.) 
                </div>
                <div>
                E-mail : maatyrecorp@gmail.com
                </div>
                <div>
                9109101300
                </div><div>
                9109101356
                </div>
               </p>
            </div>
            <div className="partydetails">
                <span>
                <label>Name {'        '} :</label>
                <input disabled={true} style={{marginLeft:'80px'}} className="datafield" id="fnfield"></input>
                </span>
                <span>
                <label>Pickup Site            :</label>
                <input disabled={true} className="datafield" style={{marginLeft:'36px'}} id="psfield"></input>
                </span>
                <span>
                <label>Pickup Date            :</label>
                <input disabled={true} className="datafield" style={{marginLeft:'31px'}} id="pdfield"></input>
                </span>
                <span>
                <label>Work Order No.         :</label>
                <input disabled={true} className="datafield" id="wonofield"></input>
                </span>
                
                
                <span>
                <label>P.R Number  :</label>
                <input disabled={true} className="datafield" style={{marginLeft:'30px'}} id="prnofield"></input>
                </span>
                <span>
                <label>Driver Name            :</label>
                <input disabled={true} className="datafield" style={{marginLeft:'25px'}} id="dfield"></input>
                </span>
                <span>
                <label>Vehicle No.            :</label>
                <input disabled={true} className="datafield" style={{marginLeft:'33px'}} id="vfield"></input>
                </span>
            </div>
            <div className="tyredetails">
                <table className="styled-table" >


                        

                    <thead>
                        <tr>
                        <th style={{ textAlign: "center"}}>Tyre S.No.</th>
                        
                        <th style={{ textAlign: "center"}}>Tyre Make</th>
                        <th style={{ textAlign: "center"}}>Tyre Size</th>
                        <th style={{ textAlign: "center"}}>Tyre Serial No.</th>
                        </tr>
                    </thead>
                    <tbody>
                    {workOrders.map((workOrder) => {
        if(workOrder.WorkOrderNumber===wono){
     return(
             
        
        
        <tr key={workOrder.TyreIdNumber}>
            
        <td>{workOrder.TyreIdNumber}</td>
            
            <td>{workOrder.TyreMake}</td>
            <td>{workOrder.TyreSize}</td>
            <td>{workOrder.TyreSerialNumber}</td>
            
            

                


                
         </tr>
      )
    }
    })}
    </tbody>
                    
                </table>
                <div><p>This is a System generated document.</p></div>
            </div>
            </div>           
            
            </div>
        </div>
    )
}