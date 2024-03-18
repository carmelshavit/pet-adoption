import React, { useState, useContext, useEffect } from "react";
import { Modal, Button, Header, Icon, Form } from "semantic-ui-react";
import LoginContext from "../context/LoginContext";
import { petService } from "../service/pet.service";
// import { localStorage } from "../service/localStorage";

export default function LoginModal({ setIsOpenLoginModal, isOpenLoginModal }) {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const login = async () => {
    const authenticatedUser = await petService.login(email, password);
    console.log("line 48", authenticatedUser);

    setLoggedInUser(authenticatedUser);
    setIsOpenLoginModal(false);
    // localStorage.saveTokenAndUserToStorage(token, user.id);
  };

  return (
    <div>
      {!loggedInUser && (
        <Modal
          closeIcon
          open={isOpenLoginModal}
          onClose={() => setIsOpenLoginModal(false)}
          onOpen={() => setIsOpenLoginModal(true)}
        >
          <Header>Login</Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={login}>
              <Icon name="checkmark" /> Login
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </div>
  );
}
