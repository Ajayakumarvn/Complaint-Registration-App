import React, { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner";
import MenuList from "../components/MenuList";
import { Button, Container } from "react-bootstrap";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const AllRecipes = () => {
  const defaultTheme = createTheme();
  const [complaint, setComplaint] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      let url = "";
      if (sessionStorage.getItem("role") === "Village Officer") {
        url = "http://localhost:4000/complaints/viewPending";
      } else if (sessionStorage.getItem("role") === "Sub Collector") {
        url = "http://localhost:4000/complaints/viewVerifiedbyVO";
      } else if (sessionStorage.getItem("role") === "Collector") {
        url = "http://localhost:4000/complaints/viewVerifiedbySC";
      } else {
        return; // Handle other roles or no role
      }

      const response = await fetch(url, {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (sessionStorage.getItem("role") === "Village Officer") {
          console.log(data);
          setComplaint(data.pending);
        } else if (sessionStorage.getItem("role") === "Sub Collector") {
          setComplaint(data.verifiedVO);
        } else if (sessionStorage.getItem("role") === "Collector") {
          setComplaint(data.verifiedSC);
        }
      } else {
        console.log("Failed to fetch complaints.");
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const verifyHandler = async (v_Id) => {
    try {
      const response = await fetch(
        `http://localhost:4000/complaints/verifyByVillage/${v_Id}`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Verification successful.");
        // You can perform any additional actions after verification
      } else {
        console.log("Verification failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <MenuList />
      <Banner title={"All Complaints"} />
      <ThemeProvider theme={defaultTheme}>
        <main style={{ marginBottom: "50px" }}>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4} style={{ paddingTop: "50px" }}>
              {complaint.map((comp) => (
                <Grid item key={comp._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                    }}
                    className="recipe_card"
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        className="cf_title"
                      >
                        {comp.subject}
                      </Typography>
                      <Typography
                        className="recipe_desc_text"
                        style={{ margin: "20px 0", color: "#1976d2" }}
                      >
                        <AccountCircleIcon style={{ marginRight: "10px" }} />
                        {comp.creator}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h6"
                        className="cf_body c_desc_text"
                      >
                        {comp.complaint}
                      </Typography>

                    <b>Status:
                    <Typography
                        gutterBottom
                        variant="h6"
                        className="cf_body c_desc_text"
                      >
                        {comp.status}
                      </Typography>
                    </b>

                    </CardContent>
                    <CardActions>
                      {/* View */}
                      <Link to={`/complaint/${comp._id}`}>
                        <Button
                          variant="primary"
                          style={{ marginRight: "20px" }}
                        >
                          View
                        </Button>{" "}
                      </Link>
                      {/* <Button
                        variant="warning"
                        onClick={() => verifyHandler(comp._id)}
                      >
                        Verify
                      </Button>{" "} */}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </Fragment>
  );
};

export default AllRecipes;
