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

const MyComplaints = () => {
  const defaultTheme = createTheme();
  const [complaint, setcomplaint] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch("http://localhost:4000/complaints/viewMy", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setcomplaint(data.myComplaints);
      } else {
        console.log("Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  async function remove(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(
      `http://localhost:4000/complaint/deleteComplaint/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      fetchComplaints();
    }
  }

  async function saved(_id) {
    const res = await fetch(`http://localhost:4000/users/saved/${_id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      fetchComplaints();
    }
  }

  const handleAddComment = async (recipeId, comment) => {
    try {
      const response = await fetch(
        `http://localhost:4000/Complaints/${recipeId}/comments`,
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
      <Banner title={"My Complaints"} />
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

                      <b style={{ marginTop: "10px" }}>
                        Status:
                        <Typography
                          gutterBottom
                          variant="h6"
                          className="cf_body c_desc_text"
                          style={{ color: "orangered" }}
                        >
                          {comp.status}
                        </Typography>
                      </b>
                    </CardContent>
                    <CardActions>
                      {/* View */}
                      <Link to={`/complaint/${comp._id}`}>
                        <Button size="small">View</Button>
                      </Link>
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

export default MyComplaints;
