import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import "./Header.css";
import "./google-fonts.css";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg">
        <Container className="border">
          <LinkContainer to="/">
            <Navbar.Brand className="navbar-brand-left">
              <img
                alt=""
                src="/images/hungryhubLogo.jpeg"
                width="50"
                height="50"
                className="d-inline-block align-top mr-0"
              />
              <span>HungryHub</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/menu">
                <i className="fas fa-info-circle mr-1"></i>Menu
              </Nav.Link>
              <Nav.Link href="/about">
                <i className="fas fa-info-circle mr-1"></i>About
              </Nav.Link>
              <Nav.Link href="/cart">
                <i className="fas fa-shopping-cart mr-1"></i>Cart
              </Nav.Link>
              <Nav.Link href="/contact">
                <i className="fas fa-envelope mr-1"></i>Contact
              </Nav.Link>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id="username"
                  className="mr-2"
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-sign-in-alt mr-1"></i>Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu" className="mr-2">
                  <NavDropdown.Item href="/admin/userlist">
                    Users
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/fooditemlist">
                    Food Items
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/admin/orderlist">
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
