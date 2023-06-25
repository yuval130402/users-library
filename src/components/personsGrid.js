import React from "react";
import { Container, Row } from "react-bootstrap";
import PersonCard from "components/personCard";

const PersonsGrid = ({users, handleEdit, handleDelete}) => {
  return (
    <Container>
      <Row xs={1} md={2} className="g-4" style={{display: "flex", justifyContent: "center"}}>
        <br/>
        {users.map((user) => (
          <PersonCard
            key={user.id ? user.id : user.email}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Row>
    </Container>
  );
};

export default PersonsGrid;
