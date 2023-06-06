import React, { Fragment } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// Pages for Routing
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RegisterSC from "./pages/Register_SC";
import RegisterVO from "./pages/Register_VO";
import AddComplaint from "./pages/AddComplaint";
import AllComplaints from "./pages/AllComplaints";
import MyComplaints from "./pages/MyComplaints";
import Complaint from "./pages/Complaint";
import FeedBackForm from "./pages/RequestForm";
import Authorities from "./pages/Authorities";
import Users from "./pages/Users";
import AddInformation from "./pages/AddInformation";
import ManageInformations from "./pages/ManageInformations";
import Informations from "./pages/Informations";
import RequestForm from "./pages/RequestForm";
import ManageApprovals from "./pages/ManageApprovals";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addsubcollector" element={<RegisterSC />} />
        <Route path="/addvillageofficer" element={<RegisterVO />} />
        <Route path="/addcomplaint" element={<AddComplaint />} />
        <Route path="/complaints" element={<AllComplaints />} />
        <Route path="/complaint/:id" element={<Complaint />} />
        <Route path="/mycomplaints" element={<MyComplaints />} />
        <Route path="/feedback" element={<FeedBackForm />} />
        <Route path="/authorities" element={<Authorities />} />
        <Route path="/users" element={<Users />} />
        <Route path="/addinfo" element={<AddInformation />} />
        <Route path="/manageinfo" element={<ManageInformations />} />
        <Route path="/info" element={<Informations />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/managerequest" element={<ManageApprovals />} />
      </Routes>
    </Fragment>
  );
};

export default App;
