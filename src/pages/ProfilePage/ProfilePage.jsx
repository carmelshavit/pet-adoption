import React, { useContext, useState } from "react";
import {
  FormGroup,
  FormField,
  Form,
  Input,
  TextArea,
  Button,
  Container,
  Segment,
} from "semantic-ui-react";
import LoginContext from "../../context/LoginContext";
import { petService } from "../../service/pet.service";

export default function ProfilePage() {
  const { loggedInUser, setLoggedInUser } = useContext(LoginContext);
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    new_password: "",
    confirm_password: "",
    current_password: "",
  });

  const editedUser = async (userDetails) => {
    const updatedUserDetails = {
      ...userDetails,
      id: loggedInUser.id,
    };
    // if(userDetails.password !== userDetails.confirmPassword)
    if (userDetails.new_password !== userDetails.confirm_password)
      return alert("passwords not identical");
    console.log(userDetails);
    const updateUser = await petService.editUser(updatedUserDetails);
    setLoggedInUser(updateUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add functionality to handle form submission
  };

  return (
    <div>
      <Form size="large" onSubmit={handleSubmit}>
        <Container>
          <Segment>
            <Container>
              <FormGroup>
                <FormField
                  control={Input}
                  label="First name"
                  placeholder="First name"
                  name="first_name"
                  value={userDetails.first_name}
                  onChange={handleChange}
                />
                <FormField
                  control={Input}
                  label="Last name"
                  placeholder="Last name"
                  name="last_name"
                  value={userDetails.last_name}
                  onChange={handleChange}
                />
              </FormGroup>
            </Container>

            <FormGroup>
              <FormField
                control={Input}
                label="Phone Number"
                placeholder="Phone Number"
                name="phone_number"
                value={userDetails.phone_number}
                onChange={handleChange}
              />
              <FormField
                control={Input}
                label="Email"
                placeholder="Email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <FormField
                control={Input}
                label="Current Password"
                placeholder="Current Password"
                type="password"
                name="current_password"
                value={userDetails.current_password}
                onChange={handleChange}
              />
              <FormField
                control={Input}
                label="New Password"
                placeholder="New Password"
                type="password"
                name="new_password"
                value={userDetails.new_password}
                onChange={handleChange}
              />
              <FormField
                control={Input}
                label="Confirm Password"
                placeholder="Confirm Password"
                type="password"
                name="confirm_password"
                value={userDetails.confirm_password}
                onChange={handleChange}
              />
            </FormGroup>
          </Segment>
          <Button onClick={() => editedUser(userDetails)}  basic
                color="violet">
            submit
          </Button>
        </Container>
      </Form>
    </div>
  );
}
