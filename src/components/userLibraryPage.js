import React from "react";
import { Container } from "react-bootstrap";

import PageHeader from "core/pageHeader";
import PersonsGrid from "components/personsGrid";

function UserLibraryPage() {
  return (
    <Container>
      <Container>
        <PageHeader title="User Library"></PageHeader>
      </Container>
      <Container>
        <PersonsGrid></PersonsGrid>
      </Container>
    </Container>
  );
}

export default UserLibraryPage;
