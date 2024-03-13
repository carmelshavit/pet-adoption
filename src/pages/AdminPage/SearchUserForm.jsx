import React, { useState } from "react";

import { Segment, Form, Container } from "semantic-ui-react";

export default function SearchUserForm({filterBy, setFilterBy}) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFilter(name, value);
  };

  const handleChangeNumber = (e) => {
    const fieldName = e.target.name;
    const value = parseFloat(e.target.value);
    updateFilter(fieldName, value);
  };

  // const options = [
  //   { key: "dog", text: "dog", value: "dog" },
  //   { key: "cat", text: "cat", value: "cat" },
  //   { key: "fish", text: "fish", value: "fish" },
  //   { key: "horse", text: "horse", value: "horse" },
  // ];
  // const handleChangeSelect = (e, { value }) => {
  //   const selectedOption = options.find((o) => o.key === value);
  //   updateFilter(type, selectedOption.text );
  // };

  return (
    <div>
      <Container>
        <Form>
          <Segment>
            <Form.Group widths="equal">
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                value={filterBy.email}
                onChange={handleChange}
              />
              <Form.Input
                label="Password"
                placeholder="Password"
                name="password"
                value={filterBy.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="phone number"
                placeholder="phone number"
                value={filterBy.phone_number}
                onChange={handleChangeNumber}
                type="number"
              />
              <Form.Input
                label="first name"
                placeholder="first name"
                value={filterBy.first_name}
                onChange={handleChange}
              />
              <Form.Input
                label="last name"
                placeholder="last name"
                value={filterBy.last_name}
                onChange={handleChange}
              />
              <Form.Input
                label="Adoption Status"
                placeholder="Adoption Status"
                value={filterBy.adoption_status}
                onChange={handleChange}
              />
            </Form.Group>
          </Segment>
        </Form>
      </Container>
    </div>
  );
}
