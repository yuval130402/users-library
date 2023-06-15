import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PageHeader = ({ title, children }) => {
  // Get title and children, Title to put on top of page -> children to add in title.
  return (
    <>
      <Container fluid>
        <Row>
          <Col style={{ display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
              <h1 style={{ marginTop: 15 }}>{title}</h1>
            </div>
            <div>{children}</div>
          </Col>
        </Row>
      </Container>
      <hr></hr>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default PageHeader;
