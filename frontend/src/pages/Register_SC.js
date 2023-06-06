import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Banner from "../components/Banner";
import MenuList from "../components/MenuList";

const defaultTheme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    eid: Yup.string().required("Eid is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const signUpSuccess = () => {
    toast.success("Added Sub Collector successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Automatically close the toast after 3 seconds
    });
  };

  const signUpError = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      eid: "",
      role: "Sub Collector",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://localhost:4000/users/addSub", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          signUpSuccess(); // Display success toast
          resetForm();
        } else {
          console.log("Failed to submit the form.");
          signUpError("Error submitting the form:"); // Display error toast
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
        signUpError("Error submitting the form:"); // Display error toast
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <MenuList />
      <Banner title="Add Sub Collector" />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ToastContainer />

          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  {...formik.getFieldProps("name")}
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  error={formik.touched.name && formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={formik.touched.email && formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    {...formik.getFieldProps("gender")}
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    label="Gender"
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <Box component="span" sx={{ color: "red" }}>
                      {formik.errors.gender}
                    </Box>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("eid")}
                  required
                  fullWidth
                  id="eid"
                  label="Enter Employee Id"
                  name="eid"
                  autoComplete="eid"
                  error={formik.touched.eid && formik.errors.eid}
                  helperText={formik.touched.eid && formik.errors.eid}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...formik.getFieldProps("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={formik.touched.password && formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
