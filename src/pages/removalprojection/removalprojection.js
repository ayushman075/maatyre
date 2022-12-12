import React from 'react'
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {collection, getDocs} from "firebase/firestore";
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

import jsPDF from 'jspdf';


const columns= [
    { field: 'FleetName', headerName: 'Fleet Name', width: 300 },
    {
      field: 'TyreStatus',
      headerName: 'Tyre Status',
      width: 150,
      editable: true, 
    },
    {
      field: 'TyreMakeAndPattern',
      headerName: 'Tyre Make and Pattern',
      width: 150,
      editable: true,
    },
    {
        field: 'TyreSerialNumber',
        headerName: 'Tyre Serial Number',
        width: 150,
        editable: true,
      },
      {
        field: 'ITD',
        headerName: 'ITD/OTD',
        width: 150,
        editable: true,
      },
      {
        field: 'OdoReading',
        headerName: 'ODO Reading',
        width: 150,
        editable: true,
      },
      {
        field: 'AvgRun',
        headerName: 'Average Daily Run',
        width: 150,
        editable: true,
      },
      {
        field: 'Date',
        headerName: 'Date',
        width: 150,
        editable: true,
      },

      {
        field: 'Vehicle',
        headerName: 'Vehicle Reg. No.',
        width: 150,
        editable: true,
      },
      {
        field: 'Wheeler',
        headerName: 'Wheeler',
        width: 150,
        editable: true,
      },
      {
        field: 'WheelPosition',
        headerName: 'Position',
        width: 150,
        editable: true,
      },
      {
        field: 'Remarks',
        headerName: 'Remarks',
        width: 150,
        editable: true,
      },
  ];





export const RemovalProjection =()=>{



  const handleGeneratePdf = () => {
    const doc = new jsPDF(
       "l","pt","tabloid"
   //    {
   //     orientation: 'landscape',
   //     unit: 'in',
   //     format: [15, 8],
       
   // }
   );
   doc.html(document.querySelector("#table"),{
       callback:function(pdf){
           pdf.save("report.pdf");

       }
   })
  }




    const [tyres,settyres]=useState([]);
    const [tyresFit,settyresFit]=useState([]);
    const [tyresRTD,settyresRTD]=useState([]);
    const [tyresRemv,settyresRemv]=useState([]);
    const tyresCollectionRef= collection(db,"Tyres");
    const tyresFitCollectionRef= collection(db,"TyreFitments");
    const tyresRTDCollectionRef= collection(db,"TyreTracking");
    const tyresRemvCollectionRef= collection(db,"TyreRemoval");

    useEffect(()=>{
        
        const getTyres= async () => {
            const tyresdata = await getDocs (tyresCollectionRef);
            settyres(tyresdata.docs.map((doc) => ({...doc.data(),id:doc.id})));
        }
        getTyres()
    }, [])
    useEffect(()=>{
        
        const getTyresFitments= async () => {
            const tyresFitdata = await getDocs (tyresFitCollectionRef);
            settyresFit(tyresFitdata.docs.map((doc) => ({...doc.data(),id:doc.id})));
        }
        getTyresFitments()
    }, [])
    useEffect(()=>{
        
        const getTyresRTD= async () => {
            const tyresRTDdata = await getDocs (tyresRTDCollectionRef);
            settyresRTD(tyresRTDdata.docs.map((doc) => ({...doc.data(),id:doc.id})));
        }
        getTyresRTD()
    }, [])
    useEffect(()=>{
        
        const getTyresRemoval= async () => {
            const tyresRemvdata = await getDocs (tyresRemvCollectionRef);
            settyresRemv(tyresRemvdata.docs.map((doc) => ({...doc.data(),id:doc.id})));
        }
        getTyresRemoval()
    }, [])
    
    function CustomToolbar(){
        return(
            <GridToolbarContainer>
            <GridToolbarExport/>
           </GridToolbarContainer>
        );
    }
    
    


        return(
           
            
            <div >
                
      <div >
        <button onClick={handleGeneratePdf}>PDF</button>
             <Box id='table' sx={{ height: 690, width: '100%' }}>
            
      <DataGrid 
        
        rows={tyresFit}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        components={{Toolbar:CustomToolbar}}
        
      />
      
    </Box>
    </div>        
            </div>
            );

      
    
        
        
    }