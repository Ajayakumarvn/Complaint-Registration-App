import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function BasicExample() {
  const hoverStyle = {
    color: "#333!important",
    background: "#8fbc8f!important",
  };

  //    Logout Handler
  const logOutHandler = () => {
    sessionStorage.clear();
  };
  return (
    <Navbar
      expand="lg"
      style={{
        position: "fixed",
        width: "100%",
        zIndex: "10",
        background: "rgba(0,0,0,.5)",
      }}
    >
      <Container className="menulist">
        <Link to="/home">
          <Navbar.Brand>C.R.A</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          style={{ justifyContent: "flex-end" }}
        >
          <div className="menu">
            <NavLink to="/home">Home</NavLink>

            {sessionStorage.getItem("role") === "Collector" ? (
              <NavLink to="/addsubcollector">Add S.C</NavLink>
            ) : (
              ""
            )}

            {sessionStorage.getItem("role") === "Sub Collector" ? (
              <NavLink to="/addvillageofficer">Add V.O</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Village Officer" ||
            sessionStorage.getItem("role") === "Citizen" ? (
              <NavLink to="/addcomplaint">Add Complaint</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Citizen" ? (
              " "
            ) : (
              <NavLink to="/complaints">All Complaints</NavLink>
            )}

            {sessionStorage.getItem("role") === "Citizen" ||
            sessionStorage.getItem("role") === "Village Officer" ? (
              <NavLink to="/mycomplaints">My Complaint</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Collector" ? (
              <NavLink to="/authorities">Authorities</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Citizen" ? (
              " "
            ) : (
              <NavLink to="/users">Users</NavLink>
            )}

            {sessionStorage.getItem("role") === "Collector" ? (
              <NavLink to="/addinfo">Add Information</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Collector" ? (
              <NavLink to="/manageinfo">Manage Information</NavLink>
            ) : (
              " "
            )}

            <NavLink to="/info">Information</NavLink>

            {sessionStorage.getItem("role") === "Citizen" ? (
              <NavLink to="/request">Request Meeting</NavLink>
            ) : (
              " "
            )}

            {sessionStorage.getItem("role") === "Sub Collector" ? (
              <NavLink to="/managerequest">Manage Request</NavLink>
            ) : (
              " "
            )}

            <Dropdown style={hoverStyle}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <AccountCircleIcon />
              </Dropdown.Toggle>

              <Dropdown.Menu style={hoverStyle}>
                <Dropdown.Item
                  style={{
                    pointerEvents: "none !important",
                    color: "#000",
                    fontFamily: "sans-serif",
                  }}
                >
                  <span style={{ color: "brown", fontWeight: "600" }}>
                    Name :
                  </span>
                  <span style={{ color: "#0CA7A7" }}>
                    {sessionStorage.getItem("name")}
                  </span>{" "}
                  <br />
                  <span style={{ color: "brown", fontWeight: "600" }}>
                    Role :
                  </span>
                  <span style={{ color: "#0CA7A7" }}>
                    {sessionStorage.getItem("role")}
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {sessionStorage.getItem("token") ? (
              <NavLink to="/">
                <Button variant="danger" onClick={logOutHandler}>
                  Logout
                </Button>{" "}
              </NavLink>
            ) : (
              <NavLink to="/">
                <Button variant="success">SignIn</Button>{" "}
              </NavLink>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
