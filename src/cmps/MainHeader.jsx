import { useContext, useState, useNavigate } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  MenuMenu,
  Button,
  ButtonGroup,
  ButtonOr,
} from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import UserFormModal from "../pages/AdminPage/UserFormModal";
import LoginModal from "./LoginModal";
import LoginContext from "../context/LoginContext";
import { petService } from "../service/pet.service";

export default function MainHeader() {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [editUserDetails, setEditUserDetails] = useState(null);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const logout = () => {
    setLoggedInUser(false);
    localStorage.removeItem("userId");
  };

  const signup = async (userDetails) => {
    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error("Test error message");
      return;
    }

    delete userDetails.confirmPassword;

    try {
      const newUser = await petService.signUp(userDetails);
      setLoggedInUser(newUser);
      setIsOpenSignupModal(false);
      toast.success("Signup successful");
    } catch (error) {
      toast.error("Error signing up");
    }
  };

  return (
    <div className="menu-header">
      <ToastContainer />

      <Menu pointing secondary size="large">
        {loggedInUser && loggedInUser.is_admin === true && (
          <MenuItem
            as={Link}
            to="/users"
            name="users"
            active={activeItem === "users"}
            onClick={handleItemClick}
          />
        )}
        <MenuItem
          as={Link}
          to="/"
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
        />
        <MenuItem
          as={Link}
          to="/search"
          name="search"
          active={activeItem === "search"}
          onClick={handleItemClick}
        />
        <MenuItem
          as={Link}
          to="/profile"
          name="profile"
          active={activeItem === "profile"}
          onClick={handleItemClick}
        />
        {loggedInUser && (
          <MenuItem
            as={Link}
            to="/MyPets"
            name="MyPets"
            active={activeItem === "MyPets"}
            onClick={handleItemClick}
          />
        )}

        <MenuMenu position="right">
          {loggedInUser && (
            <div>
              Hello, {loggedInUser.first_name} {loggedInUser.last_name}{" "}
              <Button color="red" size="small" onClick={logout}>
                Logout
              </Button>
            </div>
          )}

          {!loggedInUser && (
            <div>
              <MenuItem>
                <ButtonGroup>
                  <Button onClick={() => setIsOpenLoginModal(true)}>
                    Login
                  </Button>
                  {isOpenLoginModal && (
                    <LoginModal
                      isOpenLoginModal={isOpenLoginModal}
                      setIsOpenLoginModal={setIsOpenLoginModal}
                    />
                  )}
                  <ButtonOr />
                  {!loggedInUser && (
                    <Button positive onClick={() => setIsOpenSignupModal(true)}>
                      Signup
                    </Button>
                  )}

                  {isOpenSignupModal && (
                    <UserFormModal
                      onFormSubmit={signup}
                      isOpenSignupModal={isOpenSignupModal}
                      setIsOpenSignupModal={setIsOpenSignupModal}
                    />
                  )}
                </ButtonGroup>
              </MenuItem>
            </div>
          )}
        </MenuMenu>
      </Menu>
    </div>
  );
}
