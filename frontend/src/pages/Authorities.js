import React, { Fragment, useEffect, useState } from "react";

import Banner from "../components/Banner";
import MenuList from "../components/MenuList";

import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";

const Authorities = () => {
  const [authorities, setAuthorities] = useState([]);
  useEffect(() => {
    fetchAuthorities();
  }, []);

  const fetchAuthorities = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/users/viewAuthorities",
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAuthorities(data.authorities);
      } else {
        console.log("Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  async function removeHandler(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:4000/users/delete/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      fetchAuthorities();
    }
  }
  return (
    <Fragment>
      <MenuList />
      <Banner />
      <Container>
        <Table
          stripped
          bordered
          hover
          size="sm"
          style={{ marginTop: "50px", background: "#fff" }}
        >
          <thead
            style={{
              background: "#000",
              color: "#fff",
              height: "50px",
              verticalAlign: "middle",
            }}
          >
            <tr>
              <th>Sl.No</th>
              <th>Employee Id</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Gender</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          {authorities.map((auth, index) => (
            <tbody>
              <tr
                style={{ height: "70px", verticalAlign: "middle" }}
                key={auth._id}
              >
                <td>{index + 1}</td>
                <td>{auth.eid}</td>
                <td>{auth.name}</td>
                <td>{auth.email}</td>
                <td>{auth.gender}</td>
                <td>{auth.role}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => removeHandler(auth._id)}
                  >
                    Delete
                  </Button>{" "}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Container>
    </Fragment>
  );
};

export default Authorities;
