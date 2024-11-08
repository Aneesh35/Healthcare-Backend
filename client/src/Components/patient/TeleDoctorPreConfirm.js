import React from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";

import "./MedPreConfirm.css";
import Footer from "./Footer";

const TeleDoctorPreConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  return (
    <>
      <Navbar />
      <div className="headerWrapper">
        <div className="headerContainer">
          <div className="headerLeft">
            <h1>
              Tele-Consultation <br />
              Session with a Doctor
            </h1>
            <p>
              Skip the queue and get the advice you need from the comfort of
              your own home.
              <br /> Schedule an appointment at your convenience.
            </p>
            <button className="headerBtn">BOOK AN APPOINTMENT</button>
          </div>
          <div className="headerRight headerMed"></div>
          <div className="headerBanner">
            <div className="innerBanner">
              <div className="innerContainer innerMed">
                <h1>Consult a GP</h1>
                <p>$20 / consult</p>
              </div>
              <div className="innerContainer innerContainerBorder innerMed">
                <h1>Consult a Specialist</h1>
                <p>from $50 / consult</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="preContainer">
        <div className="preWrapper">
          <div className="preTitle">Booking confirmation</div>
          <div className="preFirstRow">
            <div className="preLeft">
              <p>Booking Type</p>
              <p>Booking For</p>
            </div>
            <div className="preRight">
              <p>Tele Consultation</p>
              <p>Marco Polo</p>
            </div>
          </div>
          <div className="preFirstRow">
            <div className="preLeft">
              <p>Consultation Date</p>
              <p>Consultation Time</p>
            </div>
            <div className="preRight">
              <p>{location.state.teleConsultDetails.date}</p>
              <p>{location.state.teleConsultDetails.time}</p>
            </div>
          </div>
          <div className="preFirstRow">
            <div className="preLeft">
              <p>Type of Consultation</p>
              <p>Total Price</p>
            </div>
            <div className="preRight">
              <p>{location.state.teleConsultDetails.doctorType}</p>
              <p>$20</p>
            </div>
          </div>

          <div className="submitContainer">
            <button
              className="headerBtn"
              onClick={() => navigate("/teleDoctor/teleConsultation-booking-confirmed")}
            >
              CONFIRM APPOINTMENT
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeleDoctorPreConfirm;
