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
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import LoginContext from "../context/LoginContext";

export default function MainHeader() {
  const [isOpenSignupModal, setIsOpenSignupModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [activeItem, setActiveItem] = useState("home");
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  //   const navigate = useNavigate();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const logout = () => {
    setLoggedInUser(false);
    // navigate("/");
    localStorage.removeItem("userId");
  };

  return (
    <div>
      <Menu pointing secondary size="large">
        {loggedInUser?.is_admin == true && (
          <MenuItem
            as={Link}
            to="/admin"
            name="admin"
            active={activeItem === "admin"}
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
        <MenuItem
          as={Link}
          to="/MyPets"
          name="MyPets"
          active={activeItem === "MyPets"}
          onClick={handleItemClick}
        />
        <MenuMenu position="right">
          {loggedInUser && (
            <div>
              Hello, {loggedInUser.first_name} {loggedInUser.last_name}
              <Button color="red" onClick={logout}>
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
                    <SignupModal
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
