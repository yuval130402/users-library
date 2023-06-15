import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Row,
} from "react-bootstrap";
import {
  fetchUsersStart,
  fetchUsersFailure,
  fetchUsersSuccess,
  updateUser,
  addUser,
  deleteUser,
} from "reducers/usersSlice";
import PersonCard from 'components/personCard';
import PersonForm from 'forms/personForm';
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
    </>
  );
};

export default PersonsGrid;
