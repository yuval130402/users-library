

import PageHeader from 'core/pageHeader';
import React from 'react'
import { Container } from 'react-bootstrap'

function HomePage() {
  return (
    <Container>
        <PageHeader title="User Library">
            <p style={{ color: "white"}}>
                <strong>
                    <h3>
                        Information about random persons, enjoy browsing!
                    </h3>
                </strong>
            </p>
        </PageHeader>
    </Container>
  )
}

export default HomePage;