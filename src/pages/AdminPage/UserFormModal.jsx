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
import React, { useState } from "react";

export default function UserFormModal({
  setIsOpenSignupModal,
  isOpenSignupModal,
  onFormSubmit,
}) {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({ ...prevUser, [name]: value }));
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
              name="first_name"
              id="form-input-control-first-name"
              control={Input}
              value={userDetails.first_name}
              onChange={handleChange}
              label="First_name"
              placeholder="First name"
            />
            <FormField
              name="last_name"
              id="form-input-control-last-name"
              control={Input}
              value={userDetails.last_name}
              onChange={handleChange}
              label="Last name"
              placeholder="Last name"
            />

            <FormField
              name="phone_number"
              id="form-input-control-Phone Number"
              control={Input}
              value={userDetails.phone_number}
              onChange={handleChange}
              label="Phone Number"
              placeholder="Phone Number"
            />
            <FormField
              name="password"
              id="form-input-control-Password"
              control={Input}
              value={userDetails.password}
              onChange={handleChange}
              label="Password"
              placeholder="Password"
            />
            <FormField
              name="confirmPassword"
              id="form-input-control-Password"
              control={Input}
              value={userDetails.confirmPassword}
              onChange={handleChange}
              label="Retype Password"
              placeholder="Retype Password"
            />
            <FormField
              name="email"
              id="form-input-control-error-email"
              control={Input}
              value={userDetails.email}
              onChange={handleChange}
              label="Email"
              placeholder="joe@schmoe.com"
              error={{
                content: "Please enter a valid email address",
                pointing: "below",
              }}
            />
            <FormField />
          </Form>
        </ModalContent>
        <ModalActions>
          <Button color="green" onClick={() => onFormSubmit(userDetails)}>
            <Icon name="checkmark" />
            submit
          </Button>
        </ModalActions>
      </Modal>
    </div>
  );
}
