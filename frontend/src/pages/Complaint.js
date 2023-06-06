import React, { Fragment, useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import Banner from "../components/Banner";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Complaint = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [complaintData, setComplaintData] = useState(null);
  const [description, setDescription] = useState("");
  const [submittedComment, setSubmittedComment] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  useEffect(() => {
    fetchComplaint();
  }, []);

  const fetchComplaint = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/complaints/viewOne/${id}`,
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setComplaintData(data.complaint);
      } else {
        console.log("Failed to fetch recipes.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleCommentChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading

    // Make the POST request to submit the comment
    const res = await fetch(
      `http://localhost:4000/complaints/addReport/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ description }),
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      setDescription("");
      fetchComplaint();
      setIsLoading(false); // Stop loading
      navigate("/complaints");
    }
  };

  const rejectHandler = async (id) => {
    // Start loading

    // Make the POST request to submit the comment
    const res = await fetch(
      `http://localhost:4000/complaints/rejectComplaint/${id}`,
      {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      // Stop loading
      navigate("/complaints");
    }
  };

  async function handleDeleteComment(_id) {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(
      `http://localhost:4000/recipes/${id}/comments/${_id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      fetchComplaint();
    }
  }

  return (
    <Fragment>
      <MenuList />
      <Banner title={"Complaint"} />
      <Container>
        {complaintData ? (
          <>
            <h3 style={{ margin: "30px 0" }}>
              Complaint : {complaintData.subject}
            </h3>
            <div className="recipe_card">
              <h5 className="recipe_subtitle">{complaintData.complaint}</h5>
            </div>

            <hr />
            {sessionStorage.getItem("role") === "Citizen" ? (
              " "
            ) : (
              <div className="comment-section">
                <h3 className="recipe_subtitle">Write Report</h3>
                <Form onSubmit={handleSubmitComment}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Review"
                    value={description}
                    onChange={handleCommentChange}
                  />
                  <Button
                    type="button"
                    style={{
                      margin: "20px auto 50px auto",
                      width: "200px",
                      padding: "10px 20px",
                      marginRight: "20px",
                    }}
                    disabled={isLoading} // Disable the button while loading
                  >
                    {isLoading ? (
                      <Spinner animation="border" variant="light" size="sm" />
                    ) : (
                      "Submit"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    style={{
                      margin: "20px auto 50px auto",
                      width: "200px",
                      padding: "10px 20px",
                    }}
                    onClick={() => rejectHandler(complaintData._id)}
                  >
                    Reject
                  </Button>
                </Form>
                {submittedComment && (
                  <div className="submitted-comment">
                    <h5>Your Comment:</h5>
                    <p>{submittedComment}</p>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <p>Loading recipe data...</p>
        )}
      </Container>
    </Fragment>
  );
};

export default Complaint;
