import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./WOUpdateForm.css";
import { db } from "../../firebase-config";
import {
  setDoc,
  doc,
  collection,
  docsS,
  getDocs,
  querySnapshot,
  getDoc,
} from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  WorkOrderNumber: "",
  TyreIdNumber: "",
  FleetName: "",
  PickupSite: "",
  Driver: "",
  Vehicle: "",
  TyreMake: "",
  TyreSize: "",
  TyreSerialNumber: "",
  Remarks: "",
  Status: "",
};

export const WOEditForm = () => {
  const [state, setState] = useState(initialState);
  const [data, setdata] = useState({});

  const {
    WorkOrderNumber,
    TyreIdNumber,
    FleetName,
    PickupSite,
    Driver,
    Vehicle,
    TyreMake,
    TyreSize,
    TyreSerialNumber,
    Remarks,
    Status,
  } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !WorkOrderNumber ||
      !TyreIdNumber ||
      !FleetName ||
      !PickupSite ||
      !Driver ||
      !Vehicle ||
      !TyreMake ||
      !TyreSerialNumber ||
      !TyreSize
    ) {
      toast.error("Fields are empty !!");
    } else {
      const workorderref = collection(db, "Work Order");

      setDoc(doc(workorderref, `${TyreIdNumber + FleetName}`), state).then(
        function () {
          toast.success("Data Updated Successfully !!");
        }
      );
    }
  };

  const { id } = useParams();

  const [workorders, setWorkOrders] = useState([]);
  const workorderCollectionRef = doc(db, "Work Order", `${id}`);

  useEffect(() => {
    const getWorkOrders = async () => {
      getDoc(workorderCollectionRef).then((doc) => {
        setWorkOrders(doc.data(), doc.id);
      });
    };
    getWorkOrders();
  }, []);
  console.log(workorders);

  useEffect(() => {
    if (id) {
      setState({ ...workorders });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, workorders]);

  return (
    <form className="woupdateform" autoComplete="on" onSubmit={handleSubmit}>
      <div className="form-main-div">
        <div className="form-one-sub-div">
          <label>Work Order No.</label>
          <input
            
            name="WorkOrderNumber"
            value={WorkOrderNumber || ""}
            onChange={handleInputChange}
            placeholder="Enter Work Order No."
          />
          <label>Tyre Id Number</label>
          <input
            
            name="TyreIdNumber"
            value={TyreIdNumber || ""}
            onChange={handleInputChange}
            placeholder="Enter Tyre Id No."
          />
        </div>
        <div className="form-two-sub-div">
          <label>Fleet Name</label>
          <input
            
            name="FleetName"
            value={FleetName || ""}
            onChange={handleInputChange}
            placeholder="Enter Fleet Name"
          />

          <label>Pickup Site</label>
          <input
            
            name="PickupSite"
            value={PickupSite || ""}
            onChange={handleInputChange}
            placeholder="Enter Pickup Site"
          />

          <label>Driver</label>
          <input
            
            name="Driver"
            value={Driver || ""}
            onChange={handleInputChange}
            placeholder="Enter Driver"
          />
          <label>Vehicle</label>
          <input
            
            name="Vehicle"
            value={Vehicle || ""}
            onChange={handleInputChange}
            placeholder="Enter Vehicle"
          />

          <label>Tyre Make</label>
          <input
            
            name="TyreMake"
            value={TyreMake || ""}
            onChange={handleInputChange}
            placeholder="Enter Tyre Make"
          />
          <label>Tyre Size</label>
          <input
           
            name="TyreSize"
            value={TyreSize || ""}
            onChange={handleInputChange}
            placeholder="Enter Tyre Size"
          />

          <label>Tyre Serial Number</label>
          <input
           
            placeholder="Enter Tyre Serial Number"
            name="TyreSerialNumber"
            value={TyreSerialNumber || ""}
            onChange={handleInputChange}
          />

          <label>Remarks</label>
          <input
            
            name="Remarks"
            value={Remarks || ""}
            onChange={handleInputChange}
            placeholder="Enter Remarks"
          />
          <label>Status</label>
          <input
            
            name="Status"
            value={Status || ""}
            onChange={handleInputChange}
            placeholder="Enter Status"
          />

          <input type="submit" className="updatebtn" />
        </div>
        <div>
          <Toaster />
        </div>
      </div>
    </form>
  );
};
