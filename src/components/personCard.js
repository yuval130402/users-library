import React from "react";
import PropTypes from "prop-types";
import { Card, Col, ListGroup, Button } from "react-bootstrap";

const PersonCard = ({ user, onEdit, onDelete }) => {
  const { id, name, email, location, picture } = user;
  return (
    <Col key={id} sm={6} md={4} lg={2} xl={3}>
      <Card>
        <Card.Img variant="top" src={picture} />
        <br />
        <Card.Title>{name}</Card.Title>

        <Card.Body>
          <ListGroup variant="flash">
            <ListGroup.Item>
              <strong>Email:</strong> <br /> {email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Location:</strong> <br /> {location}{" "}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>

        <Card.Footer>
          <Button
            variant="primary"
            onClick={() => onEdit(user)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(user.id)}>
            Delete
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

PersonCard.propTypes = {
    user: PropTypes.any,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default PersonCard;
