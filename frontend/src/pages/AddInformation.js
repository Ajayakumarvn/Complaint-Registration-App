import React, { Fragment } from "react";

import MenuList from "../components/MenuList";
import Banner from "../components/Banner";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, CssBaseline, Grid, TextField } from "@mui/material";
import { Button, Container } from "react-bootstrap";
import Card from "../components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddComplaint = () => {
  const initialValues = {
    title: "",
    detail: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    detail: Yup.string().required("Detail is required"),
  });

  const successInfo = () => {
    toast.success("Added Information", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Automatically close the toast after 3 seconds
    });
  };

  const errorInfo = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const res = await fetch("http://localhost:4000/info/addInfo", {
      method: "POST",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (res.ok) {
      successInfo(); // Display success toast
      resetForm();
    } else {
      console.log("Failed to submit the form.");
      errorInfo("Error submitting the form:"); // Display error toast
    }
  };

  return (
    <Fragment>
      <MenuList />
      <Banner title="Add Complaint" />
      <Card>
        <Container component="main" maxWidth="xs" style={{ marginTop: "20px" }}>
          <CssBaseline />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "60ch" },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* Form fields */}

                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      id="title"
                      label="Enter Title"
                      name="title"
                      autoComplete="title"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      style={{ color: "red", marginLeft: "10px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Field
                      as={TextField}
                      id="outlined-textarea"
                      label="Enter Your Complaint"
                      placeholder="Enter in Detail"
                      multiline
                      name="detail"
                    />
                    <ErrorMessage
                      name="detail"
                      component="div"
                      style={{ color: "red", marginLeft: "10px" }}
                    />
                  </Grid>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="success"
                      style={{ margin: "30px 0", width: "300px" }}
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Card>
      <ToastContainer />
    </Fragment>
  );
};

export default AddComplaint;
