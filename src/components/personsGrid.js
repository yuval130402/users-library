import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row } from "react-bootstrap";
import { updateUser, addUser, deleteUser } from "reducers/usersSlice";
import PersonCard from "components/personCard";
import PersonForm from "forms/personForm";
import HandleAPIRequests from "api/handleAPIRequests";

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
      <HandleAPIRequests />
      <Row>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add User
        </Button>
      </Row>
      <br />
      <br />
      <div className="app-content">
        <Row>
          {islLoading ? (
            <div>
              <strong>Loading...</strong>
            </div>
          ) : (
            users.map((user) => (
              <PersonCard
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </Row>
        <PersonForm
          selectedUser={selectedUser}
          showModal={showModal}
          onCloseModal={handleCloseModal}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </>
  );
};

export default PersonsGrid;
