import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/signup">Sign up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            </Container>
       </Navbar>
    );
};

export default Header;