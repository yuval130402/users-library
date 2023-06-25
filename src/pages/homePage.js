

import PageHeader from 'utils/pageHeader';
import React from 'react'
import { Container } from 'react-bootstrap'

function HomePage() {
  return (
    <Container>
        <PageHeader title="User Library">
        <h3>
            <p style={{ color: "white"}}>
                <strong>
                    Information about random persons, enjoy browsing!
                </strong>
            </p>
        </h3>
        </PageHeader>
    </Container>
  )
}

export default HomePage;