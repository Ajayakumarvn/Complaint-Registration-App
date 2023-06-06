import React, { Fragment } from "react";
import MenuList from "../components/MenuList";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div className="main_banner">
        <MenuList />
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div className="banner_content">
            <h1 className="banner-head display-1">We Are Here To Help</h1>
            <p className="banner-sub">
              The best way to find yourself is to lose yourself in the service
              of others
            </p>
            <p className="banner-sub">-Mahatma Gandhi</p>
            <Link to="/recipes">
              <button className="banner_button">Know More</button>
            </Link>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default Home;
