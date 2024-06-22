import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';
import AuthenticateService from "../../service/AuthenticateService";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(AuthenticateService.isAuthenticated());

    const onLogout = () => {
        AuthenticateService.logout();
        setIsLoggedIn(false);
    };

    useEffect(() => {
        setIsLoggedIn(AuthenticateService.isAuthenticated());
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{ "color": 'gold' }}>
                    <FontAwesomeIcon icon={faVideoSlash} />Gold
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/" key="home">Home</NavLink>
                        <NavLink className="nav-link" to="/watchList" key="watchList">Watch List</NavLink>
                    </Nav>
                    {isLoggedIn ? (
                        <Nav className="ms-auto">
                            <NavLink className="nav-link" to="/profile" key="profile">Profile</NavLink>
                            <Button variant="outline-info" onClick={onLogout} key="logout">Logout</Button>
                        </Nav>
                    ) : (
                        <Nav className="ms-auto">
                            <Button variant="outline-info" href="/login" key="login">Login</Button>
                            <Button variant="outline-info" href="/register" key="register">Register</Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
