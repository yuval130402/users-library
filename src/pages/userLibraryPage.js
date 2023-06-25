import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row } from "react-bootstrap";
import PersonForm from "forms/personForm";
import LoadingSpinner from "components/LoadingSpinner";
import PersonsGrid from "components/personsGrid";
import PaginatedFooter from "features/pagination/paginatedFooter";
import { updateUser, addUser, deleteUser } from "features/users/usersSlice";
import { changePage } from "features/pagination/pageSlice";
import { API_BASE_URL, USER_PER_PAGE, SEED, MAX_PAGE } from "utils/Constants";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "features/users/usersSlice";
import { fetchUsers } from "api/handleAPIRequests";

function UserLibraryPage() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const isLoading = useSelector((state) => state.users.isLoading);
  const currentPage = useSelector((state) => state.page.currentPage);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    picture: "",
  });

  const filteredUsers = users.filter((user) => {
    const { email, name, id, location } = user;
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    return (
      email.toLowerCase().includes(lowerCaseSearchQuery) ||
      name.toLowerCase().includes(lowerCaseSearchQuery) ||
      id.toLowerCase().includes(lowerCaseSearchQuery) ||
      location.toLowerCase().includes(lowerCaseSearchQuery)
    );
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

  const handlePageChange = (page) => {
      dispatch(changePage(page))
  }

  useEffect(() => {
    dispatch(fetchUsersStart());
    fetchUsers(API_BASE_URL, { page: currentPage, results: USER_PER_PAGE, seed: SEED}).then(result => {
      // Function has finished executing and returned the result
      if (result.response === "Success") {
        // send action to userReducer in order to update the global state.
        dispatch(fetchUsersSuccess(result.fetchedUsers));
      }
      else{
        // send action to userReducer in order to update the global state.
        dispatch(fetchUsersFailure(result.apiResponse));
      }
    })
  }, [currentPage, dispatch]);

  return (
    <>
      <div className="app-content">
        <Row>
          {isLoading ? (
            <div role="status" className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : searchQuery ? (
            <PersonsGrid
              users={filteredUsers}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            <>
              <Row style={{ paddingBottom: "10px" }}>
                <Button variant="secondary" onClick={() => setShowModal(true)}>
                  Add User
                </Button>
              </Row>
              <PersonsGrid
                users={users}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </>
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
        
        <PaginatedFooter
          totalPages={MAX_PAGE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default UserLibraryPage;
