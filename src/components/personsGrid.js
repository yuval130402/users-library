import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  ListGroup,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsersStart,
  fetchUsersFailure,
  fetchUsersSuccess,
  updateUser,
  addUser,
  deleteUser,
} from "reducers/usersSlice";
import { API_BASE_URL, USER_AMOUNT } from "Constants";
import { fetchUsersFromAPI } from "api/handleAPIRequests";

const PersonsGrid = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const islLoading = useSelector((state) => state.users.islLoading);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    picture: "",
  });

  useEffect(() => {
    dispatch(fetchUsersStart());
    fetchUsers();
  }, [dispatch]);

  /*useEffect(() => {
    fetchUsers(API_BASE_URL, { results: USER_AMOUNT })
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);*/

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const data = await response.json();
      const users = data.results.map((user) => ({
        id: user.login.uuid,
        name: `${user.name.title} ${user.name.first} ${user.name.last}`,
        picture: user.picture.medium,
        email: user.email,
        location: `${user.location.country}, ${user.location.city}, ${user.location.street.name}, ${user.location.street.number}`,
      }));
      console.log(users);
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      console.log(error);
      dispatch(fetchUsersFailure(error.message));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      location: user.location,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedUser) {
      const { id } = selectedUser;
      dispatch(updateUser({ id, ...formData }));
    } else {
      dispatch(addUser(formData));
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      location: "",
      picture: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Row>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add User
        </Button>
      </Row>
      <br />
      <br />
      <Row>
        {islLoading ? (
          <div>
            <strong>Loading...</strong>
          </div>
        ) : (
          users.map((user) => (
            <Col key={user.id} sm={6} md={4} lg={2} xl={3}>
              <Card>
                <Card.Img variant="top" src={user.picture} />
                <br />
                <Card.Title>{user.name}</Card.Title>

                <Card.Body>
                  <ListGroup variant="flash">
                    <ListGroup.Item>
                      <strong>Email:</strong> <br /> {user.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <strong>Location:</strong> <br /> {user.location}{" "}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>

                <Card.Footer>
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(user)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!selectedUser ? (
              <Form.Group controlId="formPicture">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="Enter picture"
                  value={formData.picture}
                  onChange={(e) =>
                    setFormData({ ...formData, picture: e.target.files[0] })
                  }
                />
              </Form.Group>
            ) : (
              <> </>
            )}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonsGrid;
