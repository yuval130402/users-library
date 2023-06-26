import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Urls } from "utils/Constants";

function SiteNavBar({ children }) {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary fixed-top"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand className="px-2" href="/">
          User Library
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
          <Nav.Link href={Urls.Browse}>Browse</Nav.Link>
          <Nav.Link href={Urls.Favorites}>Favorites</Nav.Link>
        </Nav>
        <div className="flex justify-end px-2">{children}</div>
      </Container>
    </Navbar>
  );
}

export default SiteNavBar;
