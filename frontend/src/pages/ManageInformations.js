import React, { Fragment, useEffect, useState } from "react";

import Banner from "../components/Banner";
import MenuList from "../components/MenuList";

import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";

const ManageInformations = () => {
  const [infos, setInfos] = useState([]);
  useEffect(() => {
    fetchInfos();
  }, []);

  const fetchInfos = async () => {
    try {
      const response = await fetch("http://localhost:4000/info/viewInfo", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInfos(data.infos);
      } else {
        console.log("Failed to fetch infos.");
      }
    } catch (error) {
      console.error("Error fetching infos:", error);
    }
  };

  async function removeHandler(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:4000/info/deleteInfo/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      fetchInfos();
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
              <th>Name</th>
              <th>Position</th>
              <th>Information Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          {infos.map((auth, index) => (
            <tbody>
              <tr
                style={{ height: "70px", verticalAlign: "middle" }}
                key={auth._id}
              >
                <td>{index + 1}</td>
                <td>{auth.creator}</td>
                <td>{auth.role}</td>
                <td>{auth.title}</td>
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

export default ManageInformations;
