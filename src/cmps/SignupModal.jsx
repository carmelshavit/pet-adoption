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

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getNewUser = () => {
    const user = {
      id: petService.makeId(),
      ...userDetails,
    };
    return user;
  };

  const signup = () => {
    const user = getNewUser();
    if (password !== confirmPassword) return alert("passwords not identical");
    petService.signUp(user);
    setLoggedInUser(user);
    logg
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
              value={userDetails.first_name}
              onChange={(e) => setUserDetails(e.target.value)}
              label="First_name"
              placeholder="First name"
            />
            <FormField
              id="form-input-control-last-name"
              control={Input}
              value={userDetails.last_name}
              onChange={(e) => setUserDetails(e.target.value)}
              label="Last name"
              placeholder="Last name"
            />

            <FormField
              id="form-input-control-Phone Number"
              control={Input}
              value={userDetails.phone_number}
              onChange={(e) => setUserDetails(e.target.value)}
              label="Phone Number"
              placeholder="Phone Number"
            />
            <FormField
              id="form-input-control-Password"
              control={Input}
              value={userDetails.password}
              onChange={(e) => setUserDetails(e.target.value)}
              label="Password"
              placeholder="Password"
            />
            <FormField
              id="form-input-control-Password"
              control={Input}
              value={userDetails.confirmPassword}
              onChange={(e) => setUserDetails(e.target.value)}
              label="Retype Password"
              placeholder="Retype Password"
            />
            <FormField
              id="form-input-control-error-email"
              control={Input}
              value={userDetails.email}
              onChange={(e) => setUserDetails(e.target.value)}
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
