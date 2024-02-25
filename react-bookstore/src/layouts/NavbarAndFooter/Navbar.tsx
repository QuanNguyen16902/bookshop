import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import IUser from "../../types/user.type";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

type State = {
  showUserBoard: boolean;
  showAdminBoard: boolean;
  currentUser: IUser | undefined;
};

const Navbar = () => {
  const [state, setState] = React.useState<State>({
    showUserBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  });

  const logOut = () => {
    AuthService.logout();
    setState({
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  };
  React.useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER"),
      });
    }

    const handleLogout = () => {
      logOut();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, []);

  const { currentUser, showAdminBoard, showUserBoard } = state;
  console.log(currentUser?.roles);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <span className="navbar-brand">BookStore</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-link">
                Search Books
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/shopping-book" className="nav-link">
                Shopping Book
              </NavLink>
            </li>

            {showUserBoard &&(
              <NavLink className="nav-link" to="/checkoutPage">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="ms-3"
                size="xl"
              />
            </NavLink>
            )
            }
            {showAdminBoard && (
              
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin
                </NavLink>
              </li>
              
              )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
