import React, { useState } from "react";

import { Segment, Form, Container } from "semantic-ui-react";

export default function SearchUserForm({ updateFilter, filterBy }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    updateFilter(name, value);
  };

  return (
    <div>
      <Container>
        <Form>
          <Segment>
            <Form.Group widths="equal">
              <Form.Input
                label="phone number"
                placeholder="phone number"
                name="phone_number"
                value={filterBy.phone_number}
                onChange={handleChange}
                type="text"
              />
              <Form.Input
                label="Adoption Status"
                placeholder="Adoption Status"
                name="adoption_status"
                value={filterBy.adoption_status}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Email"
                placeholder="Email"
                name="email"
                value={filterBy.email}
                onChange={handleChange}
              />
              <Form.Input
                label="first name"
                placeholder="first name"
                name="first_name"
                value={filterBy.first_name}
                onChange={handleChange}
              />
              <Form.Input
                label="last name"
                placeholder="last name"
                name="last_name"
                value={filterBy.last_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Segment>
        </Form>
      </Container>
    </div>
  );
}
