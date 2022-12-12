import { useState, useEffect ,useRef} from "react";
import{Link} from "react-router-dom"
import { db } from "../../firebase-config";
import {collection, getDocs,query,orderBy} from "firebase/firestore";
import './workorder.css';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../../firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactToExcel from 'react-html-table-to-excel'
import jsPDF from 'jspdf';
import XLSX from 'xlsx'





export const WorkOrder =()=>{





    const excelexport =  () => {
        
            var wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            /* Export to file (start a download) */
            XLSX.writeFile(wb, "WorkOrder.xlsx");


    }

    const tableIdref=useRef();

    const handleGeneratePdf = () => {
     const doc = new jsPDF(
        "p","pt","a4"

    
    );
    doc.html(document.querySelector("#tableId"),{
        callback:function(pdf){
            pdf.setFontSize(5);
            pdf.save("report.pdf");
           

        }
    })
    
}


    const[user]=useAuthState(auth);
    const [workorders,setWorkOrders]=useState([]);
    const workorderCollectionRef= collection(db,"Work Order");

    useEffect(()=>{
        
        const getWorkOrders= async () => {
            const workorderQuery = query(workorderCollectionRef, orderBy("WorkOrderNumber", "desc"),)
            const data = await getDocs (workorderQuery);
            setWorkOrders(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
        }
        getWorkOrders()
    }, [])


   


    return(
    
    <div >

        <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>

        {user &&(
        <>
        {/* <NavBar title="Work Order"/>    */}
        <Link to="/" className="title">Work Order</Link>
        
    <div id="maindiv" style={{ marginTop: "15px"}}>
        
            <div>
    
        <button id="sheetjsexport" onClick={excelexport}>Export as XLSX</button>

            



        
        </div>
        <table className="styled-table" id="TableToExport">
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
                    <th style={{ textAlign: "center"}}>Action</th>

                </tr>
            </thead>
            <tbody ref={tableIdref}>
    {workorders.map((workorder) => {
        if(workorder.FleetName!== undefined){
       return(
             
        
        
        <tr key={workorder.TyreIdNumber}>
            <td>{workorder.WorkOrderNumber}</td>
            <td>{workorder.TyreIdNumber}</td>
            <td>{workorder.FleetName}</td>
            <td>{workorder.PickupSite}</td>
            <td>{workorder.Driver}</td>
            <td>{workorder.Vehicle}</td>
            <td>{workorder.TyreMake}</td>
            <td>{workorder.TyreSize}</td>
            <td>{workorder.TyreSerialNumber}</td>
            <td>{workorder.Remarks}</td>
            <td>{workorder.Status}</td>
            <td>{workorder.PickupDate +" "+ workorder.PickupTime}</td>
             <td>
                <Link to={`/updateworkorder/${workorder.TyreIdNumber+workorder.FleetName}`} state={{WorkOrder:workorder.WorkOrderNumber}} >
                <button className="btn">EDIT</button>
                </Link>

                


                </td> 
         </tr>
       )}
    })}
    </tbody>
        </table>
        
    </div>
    </>)}
    </div>
    )
};




