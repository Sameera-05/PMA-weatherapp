import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const WeatherNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">🌦 WeatherApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#current-weather">Current Weather</Nav.Link>
            <Nav.Link href="#recent-events">Weather Events</Nav.Link>
            <Nav.Link href="#map-section">Weather Map</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default WeatherNavbar;
