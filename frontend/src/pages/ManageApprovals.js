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
      const response = await fetch("http://localhost:4000/approvals/viewReq", {
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInfos(data.allRequests);
      } else {
        console.log("Failed to fetch infos.");
      }
    } catch (error) {
      console.error("Error fetching infos:", error);
    }
  };

  async function approveHandler(_id) {
    const res = await fetch(`http://localhost:4000/approvals/approve/${_id}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      fetchInfos();
    }
  }

  async function rejectHandler(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`http://localhost:4000/approvals/reject/${_id}`, {
      method: "PATCH",
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
              <th style={{ width: "10%" }}>Sl.No</th>
              <th style={{ width: "20%" }}>Name</th>
              <th style={{ width: "50%" }}>Request</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          {infos.map((auth, index) => (
            <tbody>
              <tr
                style={{ height: "70px", verticalAlign: "middle" }}
                key={auth._id}
              >
                <td>{index + 1}</td>
                <td>{auth.reqByName}</td>
                <td>{auth.request}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => approveHandler(auth._id)}
                  >
                    {" "}
                    Approve
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => rejectHandler(auth._id)}
                  >
                    Reject
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
