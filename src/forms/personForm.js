import React, { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";

const PersonForm = ({
  selectedUser,
  showModal,
  onCloseModal,
  onSave,
  formData,
  setFormData,
  users,
}) => {
  const { name, email, location, picture } = formData;
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!name || name.length < 3) {
      errors.name = "Name should be at least 3 characters long.";
    }

    if (!email || !isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Check if email already exists
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      errors.email = "Email address already exists!";
    }

    if (!location) {
      errors.location = "Location is required.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave();
    }
  };

  const handleClose = () => {
    setErrors({});
    onCloseModal();
  };

  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {!selectedUser ? (
            <Form.Group controlId="formPicture">
              <Form.Label>
                <strong>Picture URL</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter picture URL"
                value={picture}
                onChange={(e) =>
                  setFormData({ ...formData, picture: e.target.value })
                }
              />
              <br />
            </Form.Group>
          ) : (
            <> </>
          )}

          <Form.Group controlId="formName">
            <Form.Label>
              <strong>Name</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formEmail">
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <br />
          <Form.Group controlId="formLocation">
            <Form.Label>
              <strong>Location</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              isInvalid={!!errors.location}
            />
            {errors.location && (
              <Form.Control.Feedback type="invalid">
                {errors.location}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PersonForm.propTypes = {
  selectedUser: PropTypes.any,
  showModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSave: PropTypes.func,
  formData: PropTypes.any,
  setFormData: PropTypes.func,
  users: PropTypes.array,
};

export default PersonForm;
