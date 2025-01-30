import "./NavBar.css";
import { LogOut, Menu } from "lucide-react";
import homebtn from "../icons/home.png";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUserName] = useState("");

  useEffect(() => {
    const pageContent = document.querySelector(".page-content");
    const modal = document.querySelector(".modal");
    if (modalOpen) {
      pageContent.classList.add("blur");
      modal?.classList.remove("blur");
    } else {
      pageContent.classList.remove("blur");
    }
  }, [modalOpen]);

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  function handleLogout() {
    setUser(null);
    setUserName("");
    sessionStorage.clear();
    console.log("User Logged Out");
  }

  function handleLoginSuccess(userId, userUserName) {
    setUser(userId);
    setUserName(userUserName);
    sessionStorage.setItem("userId", userId);
  }

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <NavLink to="/" className="home">
          <img className="homebtn" src={homebtn} alt="Back to home page" />
        </NavLink>

        <ul className="nav-links">
          <li>
            <span className="mood-boosts-title">
              <Menu className="menu-icon" />
              Mood Boosts
            </span>
            <ul className="dropdown">
              <li>
                <NavLink to="/breathing" className="navbar_boosts breathing">
                  Breathing Exercises
                </NavLink>
              </li>
              <li>
                <NavLink to="/quote" className="navbar_boosts quote">
                  Inspirational Quotes
                </NavLink>
              </li>
              <li>
                <NavLink to="/joke" className="navbar_boosts joke">
                  Joke Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/user" className="navbar_boosts user">
                  User History
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <button className="login" onClick={user ? handleLogout : handleOpenModal}>
          {user ? (
            <div className="login-content">
              <LogOut className="logout-icon" />
              Logged in as {username}. Logout
            </div>
          ) : (
            <div className="login-content">👤 
              Login/Register</div>
          )}
        </button>
      </nav>

      <Modal
        modalOpen={modalOpen}
        onClose={handleCloseModal}
        resetToSignIn={modalOpen}
        onLoginSuccess={handleLoginSuccess}
        user={user}
        setUser={setUser}
        setUserName={setUserName}
      />
    </div>
  );
}

export default NavBar;
