import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "react-bootstrap";

const PersonForm = ({
  selectedUser,
  showModal,
  onCloseModal,
  onSave,
  formData,
  setFormData,
}) => {
  const { name, email, location, picture } = formData;

  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedUser ? "Edit User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {!selectedUser ? (
            <Form.Group controlId="formPicture">
              <Form.Label>Picture URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter picture URL"
                value={picture}
                onChange={(e) =>
                  setFormData({ ...formData, picture: e.target.value })
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
              value={name}
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
              value={email}
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
              value={location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSave}>
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
};

export default PersonForm;

