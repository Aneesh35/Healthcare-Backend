import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../patient/Navbar";
import "./TableauContainer.css";

const Tableau = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <>
      <Navbar role={"doctor"} />
      <div className="dashboardContainer">
        <h1>Patient List</h1>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>
              {patient.name} - {patient.email}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Tableau;