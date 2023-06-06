import React, { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner";
import MenuList from "../components/MenuList";
import { Container } from "react-bootstrap";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Informations = () => {
  const defaultTheme = createTheme();
  const [complaint, setcomplaint] = useState([]);

  useEffect(() => {
    fetchInformations();
  }, []);

  const successComplaint = () => {
    toast.success("Added Complaint successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Automatically close the toast after 3 seconds
    });
  };

  const errorComplaint = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const fetchInformations = async () => {
    try {
      const response = await fetch("http://localhost:4000/info/viewInfo", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setcomplaint(data.infos);
        successComplaint(); // Display success toast
      } else {
        console.log("Failed to fetch Informations.");
        errorComplaint("Error submitting the form:"); // Display error toast
      }
    } catch (error) {
      console.error("Error fetching Informations:", error);
      errorComplaint("Error submitting the form:"); // Display error toast
    }
  };

  //   async function remove(_id) {
  //     if (!window.confirm("Are you sure?")) return;
  //     const res = await fetch(
  //       `http://localhost:4000/recipes/deleteRecipe/${_id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (res.ok) {
  //         fetchInformations();
  //     }
  //   }

  const handleAddComment = async (recipeId, comment) => {
    try {
      const response = await fetch(
        `http://localhost:4000/recipes/${recipeId}/comments`,
        {
          method: "PATCH",
          body: JSON.stringify({ comment }),
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Comment added successfully.");
        // You can perform any additional actions after adding the comment
      } else {
        console.log("Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Fragment>
      <MenuList />
      <Banner title={"All Informations"} />
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
                        style={{
                          fontSize: "14px!important",
                          textAlign: "left!important",
                        }}
                      >
                        {comp.title}
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
                        className="cf_body "
                        style={{
                          fontWeight: "400",
                          fontSize: "14px!important",
                        }}
                      >
                        {comp.detail}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <ToastContainer />
      </ThemeProvider>
    </Fragment>
  );
};

export default Informations;
