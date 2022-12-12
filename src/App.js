import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css';
import { WorkOrder } from './pages/workorder/workorder';
import { WorkOrderDownload } from './pages/workorderdownload/workorderdownload.js';
import {Login} from './pages/login/login'
import { AddEditWO } from './pages/updateworkorder/updateworkorder';
import { ExportWO } from './pages/exportworkorder/exportworkorder';
import { GenerateTripReport } from './pages/generatetripreport/generatetripreport';
import { NavBar } from './components/navbar';
import { auth } from "./firebase-config";
import {useAuthState} from "react-firebase-hooks/auth";
import { PendingPickupRequest } from './pages/pendingpickuprequests/pendingpickuprequests';
import { OnGoingPickupRequest } from './pages/ongoingpickuprequests/ongoingpickuprequest'; 
import{CompletedPickupRequest} from './pages/completedpickuprequests/completedpickuprequests';
import {RemovalProjection} from './pages/removalprojection/removalprojection';
import {TripPlanner} from './pages/tripplanner/tripplanner'
import { EditTrip } from './pages/editTrip/edittrip';
function App() {
  const[user]=useAuthState(auth);
  return (
    <div className="App">
      <Router>
      {/* {user &&(
        <>
                 */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/workorder' element={<WorkOrder/>}/>
          <Route path='/workorderdownload' element={<WorkOrderDownload/>}/>
          <Route path='/tripplanner' element={<TripPlanner/>}/>
          <Route path='/pendingpickuprequests' element={<PendingPickupRequest/>}/>
          <Route path='/ongoingpickuprequests' element={<OnGoingPickupRequest/>}/>
          <Route path='/completedpickuprequests' element={<CompletedPickupRequest/>}/>
          <Route path="/updateworkorder/:id" element={<AddEditWO />}/>  
          <Route path="/exportworkorder/" element={<ExportWO />}/>
          <Route path="/generatetripreport/" element={<GenerateTripReport />}/>
          <Route path="/removalprojection/" element={<RemovalProjection />}/>
          <Route path="/edittrip/:id" element={<EditTrip />}/>
          
                    
               
        </Routes>
        {/* </> )} */}
      </Router>
      
    </div>
  );
}

export default App;
