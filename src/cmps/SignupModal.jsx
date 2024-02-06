import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
  FormField,
  Form,
  Input,
} from "semantic-ui-react";
import React, { useContext, useState } from "react";
import { petService } from "../service/pet.service";
import LoginContext from "../context/LoginContext";

export default function SignupModal({
  setIsOpenSignupModal,
  isOpenSignupModal,
}) {
  const { setLoggedInUser } = useContext(LoginContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getNewUser = () => {
    const user = {
      id: petService.makeId(),
      firstName,
      lastName,
      password,
      email,
      phoneNumber
    };
    return user;
  };

  const signup = () => {
    const user = getNewUser();
    if (password !== confirmPassword) return alert("passwords not identical");
    petService.signUp(user);
    setLoggedInUser(user);
    setIsOpenSignupModal(false);
  };

  return (
    <div>
      <Modal
        closeIcon
        open={isOpenSignupModal}
        onClose={() => setIsOpenSignupModal(false)}
        onOpen={() => setIsOpenSignupModal(true)}
      >
        <Header />
        <ModalContent>
          <Form>
            <FormField
              id="form-input-control-first-name"
              control={Input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              label="First name"
              placeholder="First name"
            />
            <FormField
              id="form-input-control-last-name"
              control={Input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              label="Last name"
              placeholder="Last name"
            />

            <FormField
              id="form-input-control-Phone Number"
              control={Input}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Phone Number"
              placeholder="Phone Number"
            />
            <FormField
              id="form-input-control-Password"
              control={Input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Password"
            />
            <FormField
              id="form-input-control-Password"
              control={Input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              label="Retype Password"
              placeholder="Retype Password"
            />
            <FormField
              id="form-input-control-error-email"
              control={Input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="joe@schmoe.com"
              error={{
                content: "Please enter a valid email address",
                pointing: "below",
              }}
            />
          </Form>
        </ModalContent>
        <ModalActions>
          <Button color="green" onClick={() => signup()}>
            <Icon name="checkmark" /> Save
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
}
